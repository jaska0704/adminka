import { Spin, message, Tabs, TabsProps } from "antd";
import { CategoryForm } from "../../components/category-form";
import { useCreateCategory } from "./service/mutation/useCreateCategory";
import { TypeCategory } from "./types/type-category";
import React, { useEffect } from "react";
import { SubSubCategoryForm } from "../../components/sub-subCategoryForm";
import { useNavigate } from "react-router-dom";

export const CategoryCreate = () => {
  const { mutate, isPending } = useCreateCategory();
  const navigate = useNavigate();
  const [categoryes, setCategoryes] = React.useState("1");
  const [active, setActive] = React.useState("1");
  const [disaeblade, setDisaeblade] = React.useState(true);
  const [formSubmit, setFormSubmit] = React.useState(false);
  const onChange = (key: string) => {
    console.log(key);
  };

  interface typeData {
    title: string;
    image?: {
      file: File;
      fileList: FileList;
    };
    parent: string;
  }

  const subsubmit = (value: typeData) => {
    const dataForm = new FormData();
    dataForm.append("title", value.title);
    if (value.image) dataForm.append("image", value.image.file);
    dataForm.append("parent", categoryes);

    mutate(dataForm, {
      onSuccess: (res) => {
        message.success("success");
        console.log(res);
        setTimeout(() => {
          navigate("/home/sub-category-list");
        }, 3000);
      },
      onError: () => {
        message.error("error");
      },
    });
  };

  const submit = (value: TypeCategory) => {
    const formData = new FormData();
    formData.append("title", value.title);
    if (value.image) formData.append("image", value.image.file);
    formData.append("parent", "");

    mutate(formData, {
      onSuccess: (res) => {
        setCategoryes(String(res.data.id));
        message.success("Category created successfully!");
        setFormSubmit(true);
      },
      onError: () => {
        message.error("Error");
      },
    });
  };
  useEffect(() => {
    if (formSubmit) {
      setActive("2");
      setDisaeblade(false);
    }
  });
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create category",
      children: <CategoryForm submit={submit} isPending={isPending} />,
    },
    {
      key: "2",
      label: "Create Sub Category",
      children: <SubSubCategoryForm submit={subsubmit} />,
      disabled: disaeblade,
    },
  ];
  return isPending ? (
    <Spin />
  ) : (
    <Tabs activeKey={active} items={items} onChange={onChange} />
  );
};
