import { BannerForm } from "../../components/banner-form";
import { useCreateBanner } from "./service/mutation/useCreateBanner";
import { TypeBanner } from "../category/types/type-category";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const BannerCreate = () => {
  const { mutate, isPending } = useCreateBanner();
  const navigate = useNavigate();

  const submit = (value: TypeBanner) => {
    const dataForm = new FormData();
    dataForm.append("title", value.title);
    if (value.image) dataForm.append("image", value.image.file);
    dataForm.append("description", value.description);

    mutate(dataForm, {
      onSuccess: (res) => {
        message.success("Banner added successfully");
        console.log(res);
        setTimeout(() => {
          navigate("/home/banner-list");
        }, 3000);
      },
      onError: () => {
        message.error("Error");
      },
    });
  };

  return (
    <div>
      <BannerForm submit={submit} />
    </div>
  );
};
