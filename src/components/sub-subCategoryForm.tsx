import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Upload,
  UploadFile,
  Button,
  UploadProps,
  Image,
} from "antd";
import { CategoriesType } from "../pages/category/types/type-category";

interface SubCategoryProps {
  submit: (data: CategoriesType) => void;
  isPending: boolean;
  initialValues?: {
    title?: string;
    image?: string;
  };
}

export const SubSubCategoryForm: React.FC<SubCategoryProps> = ({
  submit,
  initialValues,
}) => {
  
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const onchange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={submit}
      initialValues={initialValues}
    >

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input a title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: "Please upload an image!" }]}
      >
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
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
