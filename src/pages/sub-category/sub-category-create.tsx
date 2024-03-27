import { SubCategoryForm } from "../../components/sub-category-form";
import { Tabs, TabsProps } from "antd";
import { Link } from "react-router-dom";

export const SubCategoryCreate = () => {
  const submit = () => {};

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <Link to={"/home/category-create"}>Create Category</Link>,
    },
    {
      key: "2",
      label: "Create Sub Category",
      children: <SubCategoryForm submit={submit} />,
    },
  ];
  return <Tabs defaultActiveKey="2" items={items} />;
};
