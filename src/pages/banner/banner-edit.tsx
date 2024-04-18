import { useNavigate, useParams } from "react-router-dom";
import { BannerForm } from "../../components/banner-form";
import { useGetBanner } from "./service/query/useGetBanner";
import { useEditBanner } from "./service/mutation/useEditBanner";
import { Spin, message } from "antd";
import { TypeBanner } from "../category/types/type-category";
import { useQueryClient } from "@tanstack/react-query";

export const BannerEdit = () => {
  const { id } = useParams();
  const { mutate, isPending } = useEditBanner(id);
  const { data, isLoading } = useGetBanner(id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const submit = (value: TypeBanner) => {
    const dataForm = new FormData();
    dataForm.append("title", value.title);
    if (value?.image && value.image.file instanceof File)
      dataForm.append("image", value.image.file);
    dataForm.append("description", value.description);

    mutate(dataForm, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["bannerList"],
        });
        message.success("Banner edited successfully!");
        setTimeout(() => {
          navigate("/home/banner-list");
        }, 3_000);
      },
      onError: () => {
        message.error("Error");
      },
    });
  };

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        <BannerForm
          submit={submit}
          initialValues={data}
          isPending={isPending}
        />
      )}
    </div>
  );
};
