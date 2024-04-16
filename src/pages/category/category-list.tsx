import { useGetCategoryList } from "./service/query/useGetCategoryList";
import { Button, Image, Input, Modal, Pagination, Spin, Table } from "antd";
import React, { FC } from "react";
import { usedeletCategory } from "./service/mutation/usedeletCategory";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSearch } from "../sub-category/service/query/useGetSearch";
import { SearchOutlined } from "@ant-design/icons";

interface Category {
  id: number;
  title: string;
  image: string;
}
[];

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

  const dataCategory = data?.data.results.map((item: Category) => ({
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
          <Button onClick={() => navigate(`/home/category-edit/${data.id}`)}>
            Edit
          </Button>
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
          paddingBlock: "20px",
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
        >
          <Search
            style={{ position: "relative", paddingBlock: "10px" }}
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
                dataSearch.map((item: Category) => {
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
            <div style={{textAlign:"center", marginTop:"40px"}}>
              <h1>
                Search
                <SearchOutlined />
              </h1>
            </div>
          )}
        </Modal>
      </div>

      <Table
        dataSource={dataCategory}
        columns={columns}
        style={{ height: "63vh", overflow: "auto", minHeight: "60vh" }}
        pagination={false}
      />
      <Pagination
        total={data?.pagesSize}
        onChange={(sizes) => setPages((sizes - 1) * 5)}
        pageSize={5}
        defaultCurrent={1}
        style={{
          padding: "5px",
          backgroundColor: "#d6b5d6",
          width: "100%",
          borderBottomRightRadius: "15px",
          borderBottomLeftRadius: "15px",
        }}
      />
    </div>
  );
};
