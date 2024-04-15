import React from "react";
import { useGetProduct } from "./service/query/useGetProduct";
import { Button, Image, Pagination, Spin, Table, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useDeletProduct } from "./service/mutation/useDeletProduct";
import { useQueryClient } from "@tanstack/react-query";

interface typeproduct {
  id: number;
  title: string;
  image: string;
  key: number;
  price: string;
}

export const ProductList = () => {
  const [pages, setPages] = React.useState<number>(1);
  const { data, isLoading } = useGetProduct("id", pages);
  const {mutate} = useDeletProduct()
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const remove = (value: number) => {
    mutate(value, {
      onSuccess: (value) => {
        queryClient.invalidateQueries({ queryKey: ["productList"] });
        console.log(value);
        
      }
    })
  };

  const dataProduct = data?.data.results.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    key: item.id,
    price: "$" + item.price,
  }));

  const columns: TableProps<typeproduct>["columns"] = [
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, data) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <Button onClick={() => remove(data.id)}>Delet</Button>
          <Button onClick={() => navigate(`/home/product-edit/${data.id}`)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return isLoading ? (
    <Spin />
  ) : (
    <div>
      <Button onClick={() => navigate("/home/product-create")} type="primary">
        Create
      </Button>
      <Table
        dataSource={dataProduct}
        columns={columns}
        style={{ height: "80vh", overflow: "auto" }}
        pagination={false}
      />
      <Pagination
        style={{
          paddingBlock: "5px",
          textAlign: "right",
        }}
        total={data?.pagesSize}
        onChange={(sizes) => setPages((sizes - 1) * 8)}
        pageSize={8}
        simple
        defaultCurrent={1}
      />
    </div>
  );
};
