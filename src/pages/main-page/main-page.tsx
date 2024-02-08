import React from 'react';

import { Layout as AntLayout } from 'antd';

import './main-page.css';
import { SideBar } from '@components/sidebar';
import { Header } from '@components/header';
import { MainContent } from '@components/mainContent';
import { Footer } from '@components/footer';

const { Header: AntHeader, Footer: AntFooter, Sider, Content } = AntLayout;

export const MainPage: React.FC = () => {
    return (
        <AntLayout className='main-page'>
            <Sider className='navigation'>
                <SideBar />
            </Sider>
            <AntLayout>
                <AntHeader>
                    <Header />
                </AntHeader>
                <Content>
                    <MainContent />
                </Content>
                <AntFooter>
                    <Footer />
                </AntFooter>
            </AntLayout>
        </AntLayout>
    );
};
