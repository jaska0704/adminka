import { useNavigate, useParams } from "react-router-dom";
import { useEditBrand } from "./service/mutation/useEditBrand";
import { useGetBrand } from "./service/query/useGetBrand";
import { useQueryClient } from "@tanstack/react-query";
import { BrandForm } from "../../components/brand-form";
import { Spin, message } from "antd";
import { brand } from "../category/types/type-category";

export const BrandEdit = () => {
  const { id } = useParams();
  const { mutate, isPending } = useEditBrand(id);
  const { data, isLoading } = useGetBrand(id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const submit = (value: brand) => {
    const dataForm = new FormData();
    dataForm.append("title", value.title);
    if (value?.image && value.image.file instanceof File)
      dataForm.append("image", value.image.file);

    mutate(dataForm, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["brand_List"],
        });
        message.success("Brand edited successfully!");
        setTimeout(() => {
          navigate("/home/brand-list");
        }, 3_000);
      },
      onError: () => {
        message.error("Error");
      },
    });
  };

  return isLoading ? <Spin/> : (
    <div>
       <BrandForm submit={submit} initialValues={data} isPending={isPending}/>
    </div>);
};
