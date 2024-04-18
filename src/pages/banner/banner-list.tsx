import {
  Button,
  ConfigProvider,
  Image,
  Pagination,
  Popconfirm,
  Spin,
  Table,
  TableProps,
  message,
} from "antd";
import { useGetBannerList } from "./service/query/useGetBannerList";
import { useNavigate } from "react-router-dom";
import { useDeleteBanner } from "./service/mutation/useDeleteBanner";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { TinyColor } from "@ctrl/tinycolor";

const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors1 = ["#fa0829", "#10c6f8", "#f70602", "#e75516"];
const colors3 = ["#26fd95", "#f1c953", "#23f38e"];
const colors4 = ["#05fd26", "#10c6f8", "#26ff00fb"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(2).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(2).toString());


const BannerList = () => {
  const [pages, setPages] = React.useState(1);
  const { data, isLoading } = useGetBannerList(pages);
  const { mutate, isPending } = useDeleteBanner();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const remove = (id: number) => {
    mutate(id, {
      onSuccess: (data) => {
        message.success("Banner removed successfully!");
        queryClient.invalidateQueries({ queryKey: ["bannerList"] });
        console.log(data);
      },
      onError: () => {
        message.error("Banner not removed!");
      },
    });
  };

  interface DataType {
    id: number;
    title: string;
    image: string;
    key: number;
  }

  const dataCategory = data?.data.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    key: item.id,
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
        return <Image width={190} height={100} src={data} />;
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
              onClick={() => navigate(`/home/banner-edit/${data.id}`)}
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

  return isLoading || isPending ? (
    <Spin />
  ) : (
    <div>
      <div style={{ paddingBottom: "20px" }}>
        <Button onClick={() => navigate("/home/banner-create")} type="primary">
          Create
        </Button>
      </div>
      <Table
        dataSource={dataCategory}
        style={{ height: "73vh", overflow: "auto" }}
        columns={columns}
      />
      <Pagination
        total={data?.pagesSize}
        onChange={(sizes) => setPages((sizes - 1) * 5)}
        pageSize={5}
        defaultCurrent={1}
        style={{
          padding: "5px",
          width: "70%",
          position: "fixed",
          bottom: 20,
        }}
      />
    </div>
  );
};

export default BannerList;
