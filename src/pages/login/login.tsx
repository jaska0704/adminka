import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./service/mutation/useLogin";
import Cookies from "js-cookie";

const token = Cookies.get("Token");
type FieldType = {
  phone_number: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const onFinish = (data: FieldType) => {
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        Cookies.set("Token", data.token, { expires: 7 });
        
          navigate("/home", { replace: true });
        
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="phone_number"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
