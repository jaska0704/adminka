import {
  Button,
  Image,
  Input,
  Modal,
  Select,
  Spin,
  Table,
  message,
} from "antd";
import { useGetBrand } from "./service/query/useGetBrand";
import { useNavigate } from "react-router-dom";
import { useDeletBrand } from "./service/mutation/useDeleteBrand";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useGetFilterId } from "./service/query/useGetFilterId";
import { useGetFilter_Id } from "./service/query/useGetFilter_Id";
import { useGetFilterTitle } from "./service/query/useGetFilterTitle";
import { useGetFilter_Title } from "./service/query/useGetFilter_Title";

export const BrandList = () => {
  const { data, isPending } = useGetBrand();
  const { data: dataId } = useGetFilterId();
  const { data: data_Id } = useGetFilter_Id();
  const { data: dataTitle } = useGetFilterTitle();
  const { data: data_Title } = useGetFilter_Title();
  const [isSelect, setIsSelect] = React.useState("");
  console.log(isSelect);

  const { mutate } = useDeletBrand();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { Search } = Input;

  const remove = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success"),
          queryClient.invalidateQueries({ queryKey: ["brandList"] });
      },
    });
  };

  interface brandType {
    id: number;
    image: string;
    title: string;
  }

  const dataBrand = data?.map((item: brandType) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    key: item.id,
  }));
  const dataBrand1 = dataId?.map((item: brandType) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    key: item.id,
  }));
  const dataBrand2 = data_Id?.map((item: brandType) => ({
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => navigate("/home/brand-create")} type="primary">
          Create
        </Button>
        <Select
          defaultValue="FILTER"
          style={{ width: "40%" }}
          onChange={(e) => setIsSelect(e)}
          options={[
            { value: "Id", label: "Id" },
            { value: "-Id", label: "Id reverse" },
            { value: "Title", label: "Title" },
            { value: "-Title", label: "Title reverse" },
          ]}
        />
      </div>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        style={{ width: "100%", marginBlock: "20px" }}
      />
      <Table
        dataSource={
          isSelect === "Id"
            ? dataBrand1
            : isSelect === "-Id"
            ? dataBrand2
            : isSelect === "Title"
            ? dataTitle
            : isSelect === "-Title"
            ? data_Title
            : dataBrand
        }
        columns={columns}
        style={{ height: "80vh", overflow: "auto" }}
      />
    </div>
  );
};
