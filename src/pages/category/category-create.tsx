import { Spin, message, Tabs, TabsProps } from "antd";
import { CategoryForm } from "../../components/category-form";
import { useCreateCategory } from "./service/mutation/useCreateCategory";
import { TypeCategory } from "./types/type-category";
import { Link, useNavigate } from "react-router-dom";


export const CategoryCreate = () => {
  const { mutate, isPending } = useCreateCategory();
  const navigate = useNavigate();
  const onChange = (key: string) => {
    console.log(key);
  };

  const submit = (value: TypeCategory) => {
    const formData = new FormData();
    formData.append("title", value.title);
    if (value.image) formData.append("image", value.image.file);
    formData.append("parent", "");

    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        setTimeout(() => {
          navigate("/home/category-list");
        }, 3_000);
      },
      onError: () => {
        message.error("error");
      },
    });
    console.log(formData);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create category",
      children: <CategoryForm submit={submit} />,
    },
    {
      key: "2",
      label: <Link to={"/home/sub-category-create"}>Create Sub Category</Link>,
    },
  ];
  return isPending ? (
    <Spin />
  ) : (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
};
