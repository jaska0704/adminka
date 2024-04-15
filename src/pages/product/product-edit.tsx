import { useNavigate, useParams } from "react-router-dom"
import { ProductCreateForm } from "../../components/product-create-form"
import { useGetSingleProduct } from "./service/query/useGetSingleProduct"
import { Spin, message } from "antd"
import { TypeProduct } from "../category/types/type-category"
import { useEditProducts } from "./service/mutation/useEditProduct"
import { useQueryClient } from "@tanstack/react-query"

export const ProductEdit = () => {
   
  const {id} = useParams()
  const {data, isLoading} = useGetSingleProduct(id);
  const {mutate} = useEditProducts(id)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  
  const submit = (value: TypeProduct) => {
    const dataForm = new FormData();
    dataForm.append("title", value.title);
    // dataForm.append("category", value.category);
    if (value?.is_new === undefined) {
      dataForm.append("is_new", "false");
    } else {
      dataForm.append("is_new", value.is_new.toString());
    }
    if (value?.is_available === undefined) {
      dataForm.append("is_available", "false");
    } else {
      dataForm.append("is_available", value.is_available.toString());
    }
    dataForm.append("price", value.price);
    if (value?.image && (value.image.file instanceof File)) dataForm.append("image", value.image.file);

    mutate(dataForm, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categoryList"] });
        message.success("Product edited successfully");
        setTimeout(() => {
          navigate("/home/product-list");
        }, 3_000);
      },
      onError: () => {
        message.error("error");
      },
    });

  }
  

  return (isLoading ? (<Spin/>) :
    <div>
      <ProductCreateForm initialValues={data} activ={false} submit={submit}/>
    </div>
  )
}
