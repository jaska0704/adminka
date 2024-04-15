import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useGetSubCategoryList } from "../pages/sub-category/service/query/useGetSubCategory";
import { TypeProduct } from "../pages/category/types/type-category";

interface ProductFormProps {
  submit?: (data: TypeProduct) => void;
  isPending?: boolean;
  activ?:boolean;
  initialValues?: {
    title?: string;
    image?: string;
    id?: number;
    is_available: boolean;
    is_new: boolean;
    price: string;
    category: string;
  };
}

export const ProductCreateForm: React.FC<ProductFormProps> = ({
  isPending,
  submit,
  initialValues,
  activ
}) => {
  const { data } = useGetSubCategoryList();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [form] = Form.useForm();


  const onchange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };
  return isPending ? (
    <Spin />
  ) : (
    <Form
      form={form}
      //   labelCol={{ span: 4 }}
      //   layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={submit}
      initialValues={initialValues}
    >
      {activ ? <Form.Item name={"category"}>
        <Select
          placeholder="Select a category"
          style={{ width: "100%", marginBlock: "20px" }}
        >
          {data?.map((item) => (
            <Select.Option label={item.title} value={item.id}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item> : <p></p>}
      <Form.Item name={"title"} rules={[{ required: true }]} label="Title">
        <Input />
      </Form.Item>
      <div style={{ display: "flex", gap: "25px" }}>
        <Form.Item
          name={"is_available"}
          label="Is Available"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item name={"is_new"} label="Is New" valuePropName="checked">
          <Switch />
        </Form.Item>
      </div>
      <Form.Item name={"price"} label="Price">
        <InputNumber  />
      </Form.Item>
      <Form.Item label="Image" name={"image"}>
        <Upload.Dragger
          maxCount={1}
          beforeUpload={() => false}
          onChange={onchange}
          multiple={false}
          fileList={fileList}
          listType="picture-card"
          style={{ maxWidth: "500px" }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <div style={{ marginTop: 8 }}>Upload</div>
        </Upload.Dragger>
      </Form.Item>
      {initialValues && !fileList.length && (
        <Image
          style={{ width: "100px", marginBlock: "30px" }}
          src={initialValues.image}
        />
      )}
      <br />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
