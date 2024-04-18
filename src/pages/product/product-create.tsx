
import { useCreateProduct } from "./service/mutation/useCreateProduct";
import { ProductCreateForm } from "../../components/product-create-form";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface typeDataProduct {
    title: string;
    image?: {
      file: File;
      fileList: FileList;
    };
    id?: number;
    is_available: boolean;
    is_new: boolean;
    price: string;
    category: string;
}

export const ProductCreate = () => {

    const {mutate, isPending} = useCreateProduct();
    const navigate = useNavigate()

    const submit = (value:typeDataProduct) => {
      const dataForm = new FormData();
      dataForm.append("title", value.title);
      dataForm.append("category", value.category)
      if(value?.is_new === undefined) {
        dataForm.append("is_new", "false")
      }else{
        dataForm.append("is_new", value.is_new.toString());
      };
      if(value?.is_available === undefined) {
        dataForm.append("is_available", "false")
      }else{
        dataForm.append("is_available", value.is_available.toString());
      };
      dataForm.append("price", value.price);
      if(value?.image) dataForm.append("image", value.image.file);

      mutate(dataForm, {
        onSuccess:()=> {
          message.success("Success Product");
          setTimeout(() => {
            navigate("/home/product-list");
          }, 3000);
        }
      })
    }
  return (
    <div>
      <div>
        <ProductCreateForm isPending={isPending} submit={submit} activ={true}/>
      </div>
    </div>
  );
}
  

