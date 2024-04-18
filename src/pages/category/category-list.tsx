import { useGetCategoryList } from "./service/query/useGetCategoryList";
import {
  Button,
  ConfigProvider,
  Image,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Spin,
  Table,
  TableProps,
} from "antd";
import React, { FC } from "react";
import { usedeletCategory } from "./service/mutation/usedeletCategory";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSearch } from "./service/query/useGetSearch";
import { SearchOutlined } from "@ant-design/icons";
import { TinyColor } from "@ctrl/tinycolor";
import { CategoryListType } from "./types/type-category";

const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

export const CategoryList: FC = () => {
  const [pages, setPages] = React.useState(1);
  const { data, isPending: dataPending } = useGetCategoryList(pages);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { mutate, isPending } = usedeletCategory();
  const { data: dataSearch, isLoading } = useGetSearch(search);
  console.log(dataSearch);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { Search } = Input;

  const remove = (data: number) => {
    mutate(data, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["categoryList"] });
        queryClient.invalidateQueries({ queryKey: ["getSearch"] });
        console.log(data);
      },
    });
  };

  const dataCategory = data?.data.results.map((item: CategoryListType) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    key: item.id,
  }));

  const columns: TableProps<CategoryListType>["columns"] = [
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
                    colors2
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
                  colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                    colors3
                  ).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                    colors3
                  ).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button
              onClick={() => navigate(`/home/category-edit/${data.id}`)}
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

  return isPending ? (
    <Spin fullscreen />
  ) : (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <Button
          onClick={() => navigate("/home/category-create")}
          type="primary"
        >
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
          okButtonProps={{ style: { display: "none" } }}
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
                dataSearch.map((item: CategoryListType) => {
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
      {dataPending ? (
        <Spin fullscreen />
      ) : (
        <Table
          dataSource={dataCategory}
          columns={columns}
          style={{ height: "74vh", overflow: "auto" }}
          pagination={false}
        />
      )}
      <Pagination
        total={data?.pagesSize}
        onChange={(sizes) => setPages((sizes - 1) * 5)}
        pageSize={5}
        defaultCurrent={1}
        style={{
          padding: "5px",
          width: "79.6%",
          position: "fixed",
          bottom: 15,
        }}
      />
    </div>
  );
};
