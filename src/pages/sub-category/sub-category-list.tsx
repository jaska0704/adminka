import { useGetSubCategoryList } from "./service/query/useGetSubCategory";
import { TinyColor } from "@ctrl/tinycolor";
import {
  Button,
  ConfigProvider,
  Image,
  Pagination,
  Popconfirm,
  Spin,
  Table,
  TableProps,
} from "antd";

import { useNavigate } from "react-router-dom";
import { useDeletSubCategory } from "./service/mutation/useDeletSubCategory";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

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

const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

export const SubCategoryList: React.FC = () => {
  const [pages, setPages] = React.useState(1);
  const { data, isPending: dataPending } = useGetSubCategoryList(pages);
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

  const dataCategory = data?.data.results.map((item: Category) => ({
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
              onClick={() => navigate(`/home/sub-category-edit/${data.id}`)}
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
    <Spin />
  ) : (
    <div>
      <div
        style={{
          paddingBottom: "20px",
        }}
      >
        <Button
          onClick={() => navigate("/home/sub-category-create")}
          type="primary"
        >
          Create
        </Button>
      </div>
      {dataPending ? (
        <Spin fullscreen style={{ height: "100%" }} />
      ) : (
        <Table
          dataSource={dataCategory}
          style={{ height: "73vh", overflow: "auto" }}
          columns={columns}
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
          // backgroundColor: "#415cf0",
          width: "90vw",
          borderBottomRightRadius: "15px",
          borderBottomLeftRadius: "15px",
          position: "fixed",
          bottom: 20,
        }}
      />
    </div>
  );
};
