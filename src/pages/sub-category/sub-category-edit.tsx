import { useParams } from "react-router-dom";
import { useEditCategory } from "../category/service/query/useEditCategory";
import { Tabs, TabsProps, message } from "antd";
import { TypeCategory, attributType } from "../category/types/type-category";
import { useEditPatch } from "../category/service/mutation/useEditPatch";
import { CategoryForm } from "../../components/category-form";
import { AttributForm } from "../../components/attribut-form";
import { useAttributCreate } from "./service/mutation/useAttributCreate";
import { useEditSubcategory } from "./service/query/useEditSubcategory";

export const SubCategoryEdit = () => {
  const { id } = useParams();
  const { data: datas } = useEditCategory(id);
  const { data: datac } = useEditSubcategory(id);
  const { mutate: attributMutate } = useAttributCreate();
  const { mutate, isPending } = useEditPatch(id);
  console.log(datas);

  const submit = (value: TypeCategory) => {
    const formData = new FormData();
    formData.append("title", value.title);
    if (value.image) formData.append("image", value.image.file);
    // formData.append("parent", "");

    mutate(formData, {
      onSuccess: (res) => {
        message.success("success");
        console.log(res);
      },
      onError: () => {
        message.error("error");
      },
    });
  };

  const sumSubmit = (data: attributType) => {
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
    const dataa = { attributes, category_id: datas?.id };

    attributMutate(dataa, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Sub Category",
      children: (
        <CategoryForm
          isPending={isPending}
          submit={submit}
          initialValues={
            { title: datac?.title, image: datac?.image, id:datas?.id } 
          }
        />
      ),
    },
    {
      key: "2",
      label: "Edit Atribute",
      children: <AttributForm initialValue={datas} submit={sumSubmit} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};
