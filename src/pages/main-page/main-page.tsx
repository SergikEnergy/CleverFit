import { FC, useState } from 'react';

import { Layout as AntLayout } from 'antd';

import './main-page.css';
import { SideBar } from '@components/sidebar';
import { Header } from '@components/header';
import { MainContent } from '@components/mainContent';
import { Footer } from '@components/footer';
import { Switcher } from '@components/switcher/switcher';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

const { Header: AntHeader, Footer: AntFooter, Sider, Content } = AntLayout;

export const MainPage: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);

    return (
        <AntLayout className='main-page'>
            <Sider
                className='navigation'
                theme='light'
                collapsed={collapsed}
                width={!collapsed ? 208 : 64}
                collapsedWidth={64}
            >
                <SideBar />
                <Switcher collapsed={collapsed} />
            </Sider>
            <AntLayout className='main-content'>
                <AntHeader className='header without-bg'>
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
