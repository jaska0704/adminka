import { BrandForm } from "../../components/brand-form";
import { brand } from "../category/types/type-category";
import { useCreateBrand } from "./service/mutation/useCreateBrand";
import { message } from "antd";



export const BrandCreate = () => {
  const { mutate } = useCreateBrand();

  const submit = (value: brand) => {
    const dataForm = new FormData();
    dataForm.append("title", value.title);
    if (value.image) dataForm.append("image", value.image.file);

    mutate(dataForm, {
      onSuccess: (res) => {
        message.success("Brand added successfully!");
        console.log(res);
      },
      onError: () => {
        message.error("Error");
      },
    });
  };

  return (
    <div>
      <BrandForm submit={submit} />
    </div>
  );
};
