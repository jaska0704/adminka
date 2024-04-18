import React, { useEffect } from "react";
import { Button, Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  SafetyOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./style-main.scss";
import image from "../../public/icons.png";
import Cookies from "js-cookie";

const { Header, Content, Sider } = Layout;



export const MainLayout: React.FC = () => {

  const token = Cookies.get("Token");
  const navigate = useNavigate()

  useEffect(()=> {
    if(!token){
      navigate("/")
    }
  })
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="main__layout">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} width={250} style={{height:"100vh"}}>
          {!collapsed ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={image}
                style={{
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  width: "50px",
                  marginBottom: "5px",
                }}
                alt="LogoIcon"
              />
              <h3
                style={{
                  fontFamily: "Lobster, sans-serif",
                  color: "#e74c3c",
                  fontSize: "23px",
                  lineHeight: "0.65",
                  fontWeight: "300",
                }}
              >
                Admin Panel
              </h3>
            </div>
          ) : (
            ""
          )}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: 1,
                icon: (
                  <HomeOutlined style={{ fontSize: "20px", color: "#08c" }} />
                ),
                label: (
                  <Link to="/home" style={{ color: "#AECBF1" }}>
                    Home
                  </Link>
                ),
              },
              {
                key: 2,
                icon: (
                  <DatabaseOutlined
                    style={{ fontSize: "20px", color: "#08c" }}
                  />
                ),
                label: (
                  <Link to="category-list" style={{ color: "#AECBF1" }}>
                    Category List
                  </Link>
                ),
              },
              {
                key: 3,
                icon: (
                  <ContainerOutlined
                    style={{ fontSize: "20px", color: "#08c" }}
                  />
                ),
                label: (
                  <Link to={"sub-category-list"} style={{ color: "#AECBF1" }}>
                    Sub Category
                  </Link>
                ),
              },
              // {
              //   key: 4,
              //   icon: <MenuFoldOutlined />,
              //   label: <Link to={"attribute-list"} style={{color:"##AECBF1}}>Attribute List</Link>,
              // },
              {
                key: 5,
                icon: (
                  <SafetyOutlined style={{ fontSize: "20px", color: "#08c" }} />
                ),
                label: (
                  <Link to={"brand-list"} style={{ color: "#AECBF1" }}>
                    Brand
                  </Link>
                ),
              },
              {
                key: 6,
                icon: (
                  <SafetyOutlined style={{ fontSize: "20px", color: "#08c" }} />
                ),
                label: (
                  <Link to={"product-list"} style={{ color: "#AECBF1" }}>
                    Product
                  </Link>
                ),
              },
              {
                key: 7,
                icon: (
                  <SafetyOutlined style={{ fontSize: "20px", color: "#08c" }} />
                ),
                label: (
                  <Link to={"banner-list"} style={{ color: "#AECBF1" }}>
                    Banner List
                  </Link>
                ),
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              padding: 24,
              backgroundColor: "#aecbf1",
              overflow: "scroll",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
