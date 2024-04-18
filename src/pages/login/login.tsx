import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./service/mutation/useLogin";
import Cookies from "js-cookie";


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
      onError: () => {
        message.error("Login or password error!");
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
        height: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          background: "white",
          paddingInline: "80px",
          paddingBlock: "50px",
          borderRadius:"20px",
          boxShadow: "5px",
          border: "1px white",
        }}
      >
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
    </div>
  );
};

export default Login;
