import { useGetCategoryList } from "./service/query/useGetCategoryList";
import { Button, Image, Table } from "antd";
import { FC } from "react";
import { usedeletCategory } from "./service/mutation/usedeletCategory";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";


interface Category {
  id: number;
  title: string;
  image: string;
}
[];

export const CategoryList: FC = () => {
  const { data } = useGetCategoryList();
  const { mutate } = usedeletCategory();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!data) {
    return <div>Loading...</div>;
  }

  const remove = (data: number) => {
    mutate(data, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["categoryList"] });
        console.log(data);
      },
    });
  };

  const dataCategory = data?.map((item: Category) => ({
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
          <Button onClick={() => navigate(`/home/category-edit/${data.id}`)}>Edit</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => navigate("/home/category-create")} type="primary">
        Create
      </Button>
      <Table
        dataSource={dataCategory}
        columns={columns}
        style={{ height: "80vh", overflow: "auto" }}
      />
      ;
    </div>
  );
};
