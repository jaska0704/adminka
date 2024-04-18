import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { TypeCategory } from "../pages/category/types/type-category";

interface CategoryFormProps {
  submit: (data: TypeCategory) => void;
  isPending?: boolean;
  initialValues?: {
    title?: string;
    image?: string;
    id?: number;
  };
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  isPending,
  submit,
  initialValues,
}) => {
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
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      style={{ maxWidth: "90%" }}
      onFinish={submit}
      initialValues={initialValues}
    >
      <Form.Item name={"title"} rules={[{ required: true }]} label="Title">
        <Input />
      </Form.Item>
      <Form.Item label="Upload Image" name={"image"}>
        <Upload.Dragger
          maxCount={1}
          beforeUpload={() => false}
          onChange={onchange}
          multiple={false}
          fileList={fileList}
          listType="picture-card"
          style={{ maxWidth: "90" }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <div style={{ marginTop: 8 }}>Upload</div>
        </Upload.Dragger>
      </Form.Item>
      {initialValues && !fileList.length && (
        <Image width={200} height={200}
          style={{ objectFit:"cover", paddingBlock:"20px", marginBottom:"20px" }}
          src={initialValues.image}
        />
      )}
      <br />
      <Button loading={isPending} style={{marginTop:"20px"}} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
