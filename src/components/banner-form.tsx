import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  UploadFile,
  UploadProps,
  Form,
  Upload
} from "antd";
import React from "react";
import { TypeBanner } from "../pages/category/types/type-category";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Bannertaype {
  submit: (data: TypeBanner) => void;
  isPending?: boolean;
  initialValues?: {
    description: string;
    id: number;
    image: string;
    title: string;
  };
}

export const BannerForm: React.FC<Bannertaype> = ({
  isPending,
  submit,
  initialValues,
}) => {
  const [value, setValue] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const onchange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      style={{ maxWidth: 1200 }}
      onFinish={submit}
      initialValues={initialValues}
    >
      <Form.Item name={"title"} rules={[{ required: true }]} label="Title">
        <Input />
      </Form.Item>
      <Form.Item label="Upload" name={"image"}>
        <Upload.Dragger
          accept=".jpg, .svg, .jpeg, .png"
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
          style={{ width: "140px", marginBlock: "30px" }}
          src={
            typeof initialValues.image === "string" ? initialValues.image : ""
          }
        />
      )}
      <br />
      <Form.Item name={"description"}>
        <ReactQuill value={value} onChange={handleChange} />
      </Form.Item>
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        loading={isPending}
        htmlType="submit"
      >
        Submit
      </Button>
    </Form>
  );
};
