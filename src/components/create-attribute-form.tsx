import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import { useGetSubCategoryList } from "../pages/sub-category/service/query/useGetSubCategory";

interface attype {
  category: [];
  title: string;
  values: {
    value: string;
  }[];
}

interface formSubmit {
  submit: (data: attype) => void;
}

const CreateAttributeForm: React.FC<formSubmit> = ({ submit }) => {
  const { data } = useGetSubCategoryList();

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={submit}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.Item name={"category"}>
        <Select
          placeholder="Select a category"
          mode="multiple"
          style={{ width: "100%", marginBlock: "20px" }}
        >
          {data?.map((item) => (
            <Select.Option label={item.title} value={item.id}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={"title"}>
        <Input placeholder="Attribute Name" />
      </Form.Item>
      <Form.List name="values">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  rules={[{ required: true, message: "Missing first name" }]}
                >
                  <Input placeholder="Value" />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAttributeForm;
