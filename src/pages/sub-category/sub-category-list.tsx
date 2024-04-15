import { useGetSubCategoryList } from "./service/query/useGetSubCategory";
import { Button, Image, Popconfirm, Spin, Table, TableProps } from "antd";

import { useNavigate } from "react-router-dom";
import { useDeletSubCategory } from "./service/mutation/useDeletSubCategory";
import { useQueryClient } from "@tanstack/react-query";

interface Category {
  id: number;
  title: string;
  image: string;
  parent: {
    title: string;
    id: number;
  };
}
[];

interface DataType {
  id: number;
  title: string;
  image: string;
  key: number;
}
[];

export const SubCategoryList: React.FC = () => {
  const { data, isPending: dataPending } = useGetSubCategoryList();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeletSubCategory();
  const navigate = useNavigate();

  const remove = (data: number) => {
    mutate(data, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["subcategoryList"] });
        console.log(data);
      },
    });
  };

  const dataCategory = data?.map((item: Category) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    key: item.id,
    parent: item.parent.title,
  }));

  const columns: TableProps<DataType>["columns"] = [
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
      title: "Category Name",
      dataIndex: "parent",
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
      render: (_, data) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <Popconfirm
            onConfirm={() => remove(data.id)}
            title={"Are you delete Sub Category?"}
          >
            <Button>Delet</Button>
          </Popconfirm>
          <Button
            onClick={() => navigate(`/home/sub-category-edit/${data.id}`)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return isPending || dataPending ? (
    <Spin />
  ) : (
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
