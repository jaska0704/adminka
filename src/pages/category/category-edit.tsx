import { useNavigate, useParams } from "react-router-dom";
import { useEditCategory } from "./service/query/useEditCategory";
import { CategoryForm } from "../../components/category-form";
import { useEditPatch } from "./service/mutation/useEditPatch";
import { TypeCategory } from "./types/type-category";
import { Button, Image, Spin, Table, Tabs, TabsProps, message } from "antd";
import { useDeletSubCategory } from "../sub-category/service/mutation/useDeletSubCategory";
import { useQueryClient } from "@tanstack/react-query";

interface Category {
  id: number;
  title: string;
  image: string;
}
[];

export const CategoryEdit = () => {
  const { id } = useParams();
  const { data, isPending } = useEditCategory(id);
  const { mutate: Mutate } = useDeletSubCategory();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useEditPatch(id);

  const onChange = (key: string) => {
    console.log(key);
  };

  const submit = (value: TypeCategory) => {
    const formData = new FormData();
    formData.append("title", value.title);

    if (value.image) formData.append("image", value.image.file);
    formData.append("parent", "");

    mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categoryList"] });
        message.success("success");
        setTimeout(() => {
          navigate("/home/category-list");
        }, 3_000);
      },
      onError: () => {
        message.error("error");
      },
    });
  };

  const remove = (data: number) => {
    Mutate(data, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["categoryList"] });
        console.log(data);
      },
    });
  };

  const dataCategory = data?.children?.map((item: Category) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    key: item.id,
  }));

  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (data: string) => {
        return <Image width={100} src={data} />;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_: any, data: Category) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <Button onClick={() => remove(data.id)}>Delet</Button>
          <Button onClick={() => navigate(`/home/sub-category-edit/${data.id}`)}>Edit</Button>
        </div>
      ),
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Category",
      children: ( 
        <CategoryForm
          isPending={isPending}
          submit={submit}
          initialValues={
            { title: data?.title, image: data?.image } || undefined
          }
        />
      ),
    },
    {
      key: "2",
      label: "Sub Category",
      children: (
        <div>
          <Table
            dataSource={dataCategory}
            style={{ height: "80vh", overflow: "auto" }}
            columns={columns}
          />
        </div>
      ),
    },
  ];

  return isPending ? (
    <Spin fullscreen />
  ) : (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
};
