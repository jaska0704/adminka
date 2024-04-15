import { message } from "antd";
import CreateAttributeForm from "../../components/create-attribute-form";
import { useCreateAttribute } from "./service/mutation/useCreateAttribute";

interface Attype {
  category: [];
  title: string;
  values: {
    value: string;
  }[];
}

export const AttributeCreate = () => {
  const { mutate } = useCreateAttribute();

  const createAttribute = (data:Attype) => {
    console.log(data);

    mutate(data, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };

  return (
    <div>
      <CreateAttributeForm submit={createAttribute} />
    </div>
  );
};
