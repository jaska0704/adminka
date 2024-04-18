import React from "react";
import { useGetProduct } from "./service/query/useGetProduct";
import { Button, ConfigProvider, Image, Modal, Pagination, Popconfirm, Spin, Table, TableProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDeletProduct } from "./service/mutation/useDeletProduct";
import { useQueryClient } from "@tanstack/react-query";
import Search from "antd/es/input/Search";
import { useGetProductSearch } from "./service/query/useGetProductSearch";
import { SearchOutlined } from "@ant-design/icons";
import { TinyColor } from "@ctrl/tinycolor";

interface typeproduct {
  id: number;
  title: string;
  image: string;
  key: number;
  price: string;
}

const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors1 = ["#fa0829", "#10c6f8", "#f70602", "#e75516"];
const colors3 = ["#26fd95", "#f1c953", "#23f38e"];
const colors4 = ["#05fd26", "#10c6f8", "#26ff00fb"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(2).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(2).toString());


export const ProductList = () => {
  const [pages, setPages] = React.useState<number>(1);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const {data: dataSearch} = useGetProductSearch(search)
  const { data, isLoading } = useGetProduct("id", pages);
  const { mutate } = useDeletProduct();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const remove = (value: number) => {
    mutate(value, {
      onSuccess: (value) => {
        queryClient.invalidateQueries({ queryKey: ["productList"] });
        console.log(value);
      },
    });
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
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(90deg,  ${colors2.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                    colors1
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                    colors2
                  ).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Popconfirm
              onConfirm={() => remove(data.id)}
              title={"Are you delete Sub Category?"}
            >
              <Button type="primary" size="large" style={{ width: 100 }}>
                Delet
              </Button>
            </Popconfirm>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(90deg,  ${colors3.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                    colors4
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                    colors3
                  ).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button
              onClick={() => navigate(`/home/product-edit/${data.id}`)}
              type="primary"
              size="large"
              style={{ width: 100 }}
            >
              Edit
            </Button>
          </ConfigProvider>
        </div>
      ),
    },
  ];

  return isLoading ? (
    <Spin />
  ) : (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <Button onClick={() => navigate("/home/product-create")} type="primary">
          Create
        </Button>
        <Button type="primary" onClick={() => setOpen(true)}>
          Search
        </Button>
        <Modal
          title=""
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          closable={false}
        >
          <Search
            style={{ position: "relative", paddingTop: "25px" }}
            placeholder="Search text"
            enterButton="Search"
            size="large"
            onChange={(e) => setSearch(e.target.value.trimStart())}
          />
          {search.length >= 3 ? (
            <div
              style={{
                width: "100%",
                backgroundColor: "#efdbdb",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {isLoading && search.length >= 3 ? (
                <Spin />
              ) : (
                dataSearch?.map((item: typeproduct) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        to={`/home/category-edit/${item?.id}`}
                        style={{
                          display: "flex",
                          gap: "300px",
                          alignItems: "center",
                          paddingInline: "10px",
                          paddingBlock: "10px",
                          width: "90%",
                        }}
                      >
                        <img
                          style={{ width: "80px" }}
                          src={item.image}
                          alt="img"
                        />
                        <p style={{}}>{item.title.toUpperCase()}</p>
                      </Link>
                      <Button onClick={() => remove(item.id)}>Delet</Button>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <h1>
                Search
                <SearchOutlined />
              </h1>
            </div>
          )}
        </Modal>
      </div>
      <Table
        dataSource={dataProduct}
        columns={columns}
        style={{ height: "74vh", overflow: "auto" }}
        pagination={false}
      />
      <Pagination
        style={{
          padding: "5px",
          width: "79.6%",
          position: "fixed",
          bottom: 15,
        }}
        total={data?.pagesSize}
        onChange={(sizes) => setPages((sizes - 1) * 8)}
        pageSize={8}
        defaultCurrent={1}
      />
    </div>
  );
};
