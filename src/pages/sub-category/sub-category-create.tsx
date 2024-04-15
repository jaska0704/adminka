import { Tabs, message } from "antd";
import { SubCategoryForm } from "../../components/sub-category-form";
import { CategoriesType, attributType } from "../category/types/type-category";
import { AttributForm } from "../../components/attribut-form";
import { useAttributCreate } from "./service/mutation/useAttributCreate";
import React from "react";
import { useCreateSubCategory } from "./service/mutation/useCreateSubCategory";

export const SubCategoryCreate = () => {
  const { mutate, isPending: subCategoryPending } = useCreateSubCategory();
  const { mutate: attributMutate } = useAttributCreate();
  const [attribut, setAttribut] = React.useState<number | undefined>(undefined);

  const attributSubmit = (data: attributType) => {
    console.log(data);

    const attributes = data?.items.map((item) => {
      return {
        attribute_id: null,
        title: item.title,
        values: item?.values?.map((items) => {
          return {
            value: items.value,
            value_id: null,
          };
        }),
      };
    });
    const dataa = { attributes, category_id: attribut };

    attributMutate(dataa, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };

  const submit = (value: CategoriesType) => {
    const dataForm = new FormData();
    dataForm.append("title", value.title);
    dataForm.append("parent", String(value.parent));
    if (value.image) dataForm.append("image", value.image.file);

    mutate(dataForm, {
      onSuccess: (res) => {
        message.success("success");
        console.log(res.data);
        setAttribut(res.data.id);
      },
      onError: () => {
        message.error("error");
      },
    });
  };

  const item = [
    {
      key: "1",
      label: "Create Sub Category",
      children: (
        <SubCategoryForm submit={submit} isPending={subCategoryPending} />
      ),
    },
    {
      key: "2",
      label: "Attribute",
      children: <AttributForm submit={attributSubmit} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={item} />;
};
