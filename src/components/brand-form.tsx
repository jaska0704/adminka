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
import { brand, types } from "../pages/category/types/type-category";

interface BrandFormProps {
  submit: (data: brand) => void;
  isPending?: boolean;
  initialValues?: types
}

export const BrandForm: React.FC<BrandFormProps> = ({
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
      style={{ maxWidth: 600 }}
      onFinish={submit}
      initialValues={initialValues}
    >
      <Form.Item name={"title"} rules={[{ required: true }]} label="Input">
        <Input />
      </Form.Item>
      <Form.Item label="Upload" name={"image"}>
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
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        htmlType="submit"
        loading={isPending}
      >
        Submit
      </Button>
    </Form>
  );
};
