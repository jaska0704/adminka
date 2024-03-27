import React from "react";
import { Layout, Menu } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
  ContainerOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import "./style-main.scss";

const { Header, Content, Sider } = Layout;

interface MenuItem {
  key: number;
  icon: React.ReactNode;
  label: string | React.ReactNode;
}

const sideBar: MenuItem[] = [
  {
    key: 1,
    icon: <HomeOutlined />,
    label: <Link to="/home">Home</Link>,
  },
  {
    key: 2,
    icon: <DatabaseOutlined />,
    label: <Link to="category-list">Category List</Link>,
  },
  {
    key: 3,
    icon: <ContainerOutlined />,
    label: <Link to={"sub-category-list"}>Sub Category</Link>,
  },
  {
    key: 4,
    icon: <LaptopOutlined />,
    label: "Noutbuk",
  },
];

const items2: MenuItem[] = sideBar.map((item) => ({
  key: item.key,
  icon: item.icon,
  label: item.label,
}));

export const MainLayout: React.FC = () => {
  return (
    <div className="main__layout">
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              onSelect={(item) => console.log(item)}
            >
              {items2.map((item) => (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                ></Menu.SubMenu>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content style={{ padding: 24 }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
