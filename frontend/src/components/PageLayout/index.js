import React from "react";
import { Layout, theme, ConfigProvider } from 'antd';
import Header from "../PageLayout/Header";
import { Outlet } from "react-router-dom";
import Sider from "../PageLayout/Sider";
const { Content } = Layout;

function PageLayout() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <ConfigProvider
                theme={{
                    components: {}
                }}
            >
                <Layout>
                    <Header />
                    <Layout>
                        <Sider />
                        <Layout
                            style={{
                                backgroundColor: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Content
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                    background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                }}
                            >
                                <Outlet />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </>
    );
}
export default PageLayout;