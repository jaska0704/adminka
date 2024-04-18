import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Spin } from "antd";
import {  useDeletAttribute } from "../pages/sub-category/service/mutation/useDeletAttribute";
import { attributType } from "../pages/category/types/type-category";
import { useDeletAttributValues } from "../pages/sub-category/service/mutation/useDeletAttributeValue";



export interface AtributType {
  submit: (data: attributType) => void;
  initialValue?:
    | {
        attributes: {
          id: number | undefined;
          title: string;
          values: {
            value: string;
            id: number | undefined;
          }[];
        }[];
        category_id: number | undefined;
      }
    | undefined;
}

export const AttributForm: React.FC<AtributType> = ({
  submit,
  initialValue,
}) => {
  const [form] = Form.useForm();
  const { mutate, isPending} = useDeletAttributValues();
  const {mutate:Mutate, isPending:isPendingDel} = useDeletAttribute();
  

  const deletAttributValue = (valueId: number | undefined) => {
    if (valueId) {
      Mutate(valueId, {
        onSuccess: () => {
          console.log("Attribute value deleted successfully");
        },
        onError: (error) => {
          console.error("Error deleting attribute value:", error);
        },
      });
    }
  };

  const deletAttribut = (attributeId: number | undefined) => {
    if (attributeId) {
      mutate(attributeId, {
        onSuccess: () => {
          console.log("Attribute deleted successfully");
        },
        onError: (error) => {
          console.error("Error deleting attribute:", error);
        },
      });
    }
  };

  return isPending || isPendingDel ? (
    <Spin />
  ) : (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={initialValue}
      onFinish={submit}
    >
      <Form.List name="items" initialValue={initialValue?.attributes}>
        {(fields, { add, remove }) => {
          return (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field) => {
                // console.log(initialValue?.attributes[field.key].values.length);

                return (
                  <Card
                    size="small"
                    title={`Item ${field.name + 1}`}
                    key={field.key}
                    extra={
                      initialValue?.attributes[field.key]?.values.length ? (
                        ""
                      ) : (
                        <CloseOutlined
                          onClick={() => {
                            deletAttributValue(
                              initialValue?.attributes[field.key].id
                            );
                            remove(field.name);
                          }}
                        />
                      )
                    }
                  >
                    <Form.Item label="Name" name={[field.name, "title"]}>
                      <Input />
                    </Form.Item>

                    <Form.Item label="List">
                      <Form.List name={[field.name, "values"]}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 16,
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, "value"]}
                                >
                                  <Input placeholder="first" />
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => {
                                    isPending ? (
                                      <Spin />
                                    ) : (
                                      deletAttribut(
                                        initialValue?.attributes[field.key]
                                          ?.values[subField.key]?.id
                                      )
                                    );
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              block
                            >
                              + Add Sub Item
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                );
              })}

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          );
        }}
      </Form.List>
      <Button loading={isPending} style={{ marginTop: "20px" }} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
