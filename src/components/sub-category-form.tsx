// import React from "react";
// import { InboxOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Form,
//   Input,
//   Select,
//   Upload,
//   UploadFile,
//   UploadProps,
// } from "antd";
// import { useGetCategoryList } from "../pages/category/service/query/useGetCategoryList";

// interface SubCategoryProps {
//   submit: (data: any) => void;
// }

// export const SubCategoryForm: React.FC<SubCategoryProps> = ({ submit }) => {
//   const { data: Data } = useGetCategoryList();
//   const [fileList, setFileList] = React.useState<UploadFile[]>([]);
//   const onchange: UploadProps["onChange"] = ({ fileList }) => {
//     console.log(fileList);

//     setFileList(fileList);
//   };

//   return (
//     <>
//       <Form
//         labelCol={{ span: 4 }}
//         wrapperCol={{ span: 14 }}
//         layout="vertical"
//         style={{ maxWidth: 600 }}
//         onFinish={submit}
//       >
//         <Form.Item label="Select">
//           <Select
//             defaultValue="Categoryes"
//             style={{ width: "100%" }}
//             options={Data?.map((item) => ({
//               value: item.title,
//               label: item.title,
//             }))}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Input"
//           name="Input"
//           rules={[{ required: true, message: "Please input!" }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item label="Upload" rules={[{ required: true }]} name={"image"}>
//           <Upload.Dragger
//             maxCount={1}
//             beforeUpload={() => false}
//             onChange={onchange}
//             multiple={false}
//             fileList={fileList}
//             listType="picture-card"
//             style={{ maxWidth: "500px" }}
//           >
//             <p className="ant-upload-drag-icon">
//               <InboxOutlined />
//             </p>
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </Upload.Dragger>
//         </Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// };
// // { value: "jack", label: "Jack" },

import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload, UploadFile, Button, UploadProps } from "antd";
import { useGetCategoryList } from "../pages/category/service/query/useGetCategoryList";
import { TypeCategory } from "../pages/category/types/type-category";

interface SubCategoryProps {
  submit: (data: any) => void;
}

interface Category {
  id: number;
  title: string;
  image: File;
  children?: SubCategory[];
}

interface SubCategory {
  id: number;
  title: string;
  image: File;
  parent:number
}

export const SubCategoryForm: React.FC<SubCategoryProps> = ({ submit }) => {
  const { data: categories } = useGetCategoryList();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const onFinish = (values: Category) => {
    console.log(values);
    const parent = values.id;
    const title = values.title;
    const image = fileList.length > 0 ? fileList[0].url : "";

    const data: TypeCategory = {
      parent,
      title,
      image,
    };
  }
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
      onFinish={onFinish}
    >
      <Form.Item
        label="id"
        name="id"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select a category">
          {categories?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

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

      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};


