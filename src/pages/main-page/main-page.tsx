import React from 'react';

import { Layout } from 'antd';

import './main-page.css';
import { SideBar } from '@components/sidebar';
import { Header } from '@components/header';
import { MainContent } from '@components/mainContent';
import { Footer } from '@components/footer';

const { Header: AntHeader, Footer: AntFooter, Sider, Content } = Layout;

export const MainPage: React.FC = () => {
    return (
        <Layout className='main-page'>
            <Sider className='navigation'>
                <SideBar />
            </Sider>
            <Layout>
                <AntHeader>
                    <Header />
                </AntHeader>
                <Content>
                    <MainContent />
                </Content>
                <AntFooter>
                    <Footer />
                </AntFooter>
            </Layout>
        </Layout>
    );
};
