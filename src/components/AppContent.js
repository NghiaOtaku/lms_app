import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
const { Content } = Layout;
const AppContent = () => (
    <Content className="site-layout-background">
        <Outlet />
    </Content>
);

export default React.memo(AppContent);
