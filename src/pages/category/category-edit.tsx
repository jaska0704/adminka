import { useParams } from "react-router-dom";
import { useEditCategory } from "./service/query/useEditCategory";
import { CategoryForm } from "../../components/category-form";

export const CategoryEdit = () => {
  const { id } = useParams();
  const { data ,isLoading} = useEditCategory(id);
  

  const submit = () => {};

  return (
    <div>
      <CategoryForm submit={submit} initialValues={{title: data?.title, image:data?.image} || undefined }/>
    </div>
  );
};
