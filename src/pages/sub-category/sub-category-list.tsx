import { useGetSubCategoryList } from "./service/query/useGetSubCategory";
import { Button, Image, Table } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDeletSubCategory } from "./service/mutation/useDeletSubCategory";

interface Category {
  id: number;
  title: string;
  image: string;
}
[];

export const SubCategoryList: FC = () => {
  const { data } = useGetSubCategoryList();
  const { mutate, isPending } = useDeletSubCategory();
  const navigate = useNavigate();

  if (!data) {
    return <div>Loading...</div>;
  }

  const remove = (data: number) => {
    mutate(data, {
      onSuccess: (data) => {
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
      render: (_:any, data: Category) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <Button onClick={() => remove(data.id)}>Delet</Button>
          <Button>Edit</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        onClick={() => navigate("/home/sub-category-create")}
        type="primary"
      >
        Create
      </Button>
      <Table
        dataSource={dataCategory}
        style={{ height: "80vh", overflow: "auto" }}
        columns={columns}
      />
    </div>
  );
};
