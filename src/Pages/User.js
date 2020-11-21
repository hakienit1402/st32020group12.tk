import React from 'react'
import {Layout,Breadcrumb} from 'antd'
const {Content} = Layout
export const User = () => {
    return (
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>User Management</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflow:"auto"
            }}
          >
            user
          </Content>
        </Layout>
    )
}
