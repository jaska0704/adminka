import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Upload, UploadFile, UploadProps } from "antd";

interface dataProps {
  title: string;
  image: string
}

interface CategoryFormProps {
  submit: (data: dataProps) => void;
  initialValues?: {
    title?: string;
    image?: string;
  };
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ submit, initialValues }) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onchange: UploadProps["onChange"] = ({ fileList }) => {
    console.log(fileList);
    setFileList(fileList);
  };
  return (
    <>
      <Form
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

        <Form.Item label="Upload" rules={[{ required: true }]} name={"image"}>
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
        {initialValues && <Image src={initialValues.image}/>}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
