import { Spin, Tabs, message } from "antd";
import { SubCategoryForm } from "../../components/sub-category-form";
import { CategoriesType, attributType } from "../category/types/type-category";
import { AttributForm } from "../../components/attribut-form";
import { useAttributCreate } from "./service/mutation/useAttributCreate";
import React, { useEffect } from "react";
import { useCreateSubCategory } from "./service/mutation/useCreateSubCategory";

export const SubCategoryCreate = () => {
   const [formSubmit, setFormSubmit] = React.useState(false);
   const [active, setActive] = React.useState("1");
   const [disaeblade, setDisaeblade] = React.useState(true);
  const { mutate, isPending: subCategoryPending } = useCreateSubCategory();
  const { mutate: attributMutate } = useAttributCreate();
  const [attribut, setAttribut] = React.useState<number | undefined>(undefined);

  const attributSubmit = (data: attributType) => {

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
        message.success("Sub category created!");
        setAttribut(res.data.id);
        setFormSubmit(true)
      },
      onError: () => {
        message.error("Error");
      },
    });
  };

  useEffect(()=> {
    if(formSubmit) {
      setActive("2");
      setDisaeblade(false)
    }
  })

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
      disabled: disaeblade,
    },
  ];

  return subCategoryPending ? (<Spin/>) : <Tabs activeKey={active} items={item} />;
};
