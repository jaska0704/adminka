import {
  Button,
  ConfigProvider,
  Image,
  Pagination,
  Popconfirm,
  Select,
  Spin,
  Table,
  message,
} from "antd";

import { useNavigate } from "react-router-dom";
import { useDeletBrand } from "./service/mutation/useDeleteBrand";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { usePageFilter } from "./service/query/useGetBrandFilter";
import { TinyColor } from "@ctrl/tinycolor";

const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors1 = ["#fa0829", "#10c6f8", "#f70602", "#e75516"];
const colors3 = ["#26fd95", "#f1c953", "#23f38e"];
const colors4 = ["#05fd26", "#10c6f8", "#26ff00fb"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(2).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(2).toString());



export const BrandList = () => {
  const [isSelect, setIsSelect] = React.useState("");
  const [pages, setPages] = React.useState(1);
  const {data, isLoading} = usePageFilter(pages, isSelect)
  const { mutate, isPending } = useDeletBrand();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  

  const remove = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success"),
          queryClient.invalidateQueries({ queryKey: ["brand_List"] });
      },
    });
  };

  interface brandType {
    id: number;
    image: string;
    title: string;
  }

  const dataBrand = data?.data?.map((item: brandType) => ({
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
      render: (_: any, data: brandType) => (
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
              onClick={() => navigate(`/home/brand-edit/${data.id}`)}
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
        <Button onClick={() => navigate("/home/brand-create")} type="primary">
          Create
        </Button>
        <Select
          defaultValue="FILTER"
          style={{ width: "40%" }}
          onChange={(e) => setIsSelect(e)}
          options={[
            { value: "?ordering=id", label: "Id" },
            { value: "?ordering=-id", label: "Id reverse" },
            { value: "?ordering=title", label: "Title" },
            { value: "?ordering=-title", label: "Title reverse" },
          ]}
        />
      </div>
      {isLoading ? (
        <Spin fullscreen/>
      ) : (
        <Table
          dataSource={dataBrand}
          columns={columns}
          style={{ height: "75vh", overflow: "auto" }}
          pagination={false}
        />
      )}
      <Pagination
        total={data?.pagesSize}
        onChange={(sizes) => setPages((sizes - 1) * 7)}
        pageSize={7}
        defaultCurrent={1}
        style={{
          padding: "5px",
          position: "fixed",
          bottom: 20,
        }}
      />
    </div>
  );
};
