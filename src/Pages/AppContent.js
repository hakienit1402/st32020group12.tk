import React, { useState } from "react";
import { Layout, Menu, Avatar, Row } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ClusterOutlined,
  TeamOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Lease } from "./Lease";
import { User } from "./User";
import { Room } from "./Room";
import { Link, Route, Switch } from "react-router-dom";
import { Page404 } from "./404/Page404";
const { Header, Sider } = Layout;
const AppContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(collapsed === false ? true : false);
  };
  return (
    <Layout style={{ fontSize: 15, height: 600 }}>
      {/* <Sider trigger={null} collapsible collapsed={collapsed}>
        <Row
          className="logo"
          style={{
            backgroundColor: "lightgray",
            height: 65,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar size={40}>ADMIN</Avatar>
        </Row>
        <Menu mode="inline">
          <Menu.Item
            key="1"
            icon={<CarryOutOutlined />}
            style={{ fontSize: 15 }}
          >
            <Link to="/">Lease room</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />} style={{ fontSize: 15 }}>
            <Link to="/user">User Management</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<ClusterOutlined />}
            style={{ fontSize: 15 }}
          >
            <Link to="/room">Room Management</Link>
          </Menu.Item>
        </Menu>
      </Sider> */}
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        {/* <Switch>
          <Route exact={true} path="/">
            <Lease />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/room">
            <Room />
          </Route>
          <Route path="">
            <Page404 />
          </Route>
        </Switch> */}
      </Layout>
    </Layout>
  );
};

export default AppContent;
