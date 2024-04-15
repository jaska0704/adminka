import { useQueryClient } from "@tanstack/react-query";
import { useGetAttribute } from "./service/query/useGetAttribute";
import { Button, Popconfirm, Spin, Table, TableProps, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDeletAttribute } from "../sub-category/service/mutation/useDeletAttribute";

interface attributeType {
  id: number;
  title: string;
  category_title: string;
}

export const AttributeList = () => {
  const { data, isPending } = useGetAttribute();
  const { mutate } = useDeletAttribute();
  console.log(data);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const dataAttribute = data?.results?.map((item) => ({
    id: item.id,
    title: item.title,
    category_title: item.category_title?.map((items) => items.title).join(" "),
  }));

  const remove = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success"),
          queryClient.invalidateQueries({ queryKey: ["attributeList"] });
      },
    });
  };

  const columns: TableProps<attributeType>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Attribut Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Sub Category Name",
      dataIndex: "category_title",
      key: "category_title",
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

  return isPending ? (
    <Spin />
  ) : (
    <div>
      <Button onClick={() => navigate("/home/attribute-create")} type="primary">
        Create
      </Button>
      <Table
        dataSource={dataAttribute}
        style={{ height: "80vh", overflow: "auto" }}
        columns={columns}
      />
    </div>
  );
};
