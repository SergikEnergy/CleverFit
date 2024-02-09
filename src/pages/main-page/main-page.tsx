import { FC } from 'react';

import { Layout as AntLayout } from 'antd';

import './main-page.css';
import { SideBar } from '@components/sidebar';
import { Header } from '@components/header';
import { MainContent } from '@components/mainContent';
import { Footer } from '@components/footer';
import { Switcher } from '@components/switcher/switcher';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

const { Header: AntHeader, Footer: AntFooter, Sider, Content } = AntLayout;
import { primaryLight } from '../../data/colors';

export const MainPage: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);

    return (
        <AntLayout className='main-page'>
            <Sider
                className='navigation'
                collapsible
                trigger={null}
                theme='light'
                collapsed={collapsed}
                width={!collapsed ? 208 : 64}
                collapsedWidth={64}
            >
                <SideBar />
                <Switcher collapsed={collapsed} />
            </Sider>
            <AntLayout className='main-content'>
                <AntHeader
                    className='header'
                    style={{
                        padding: 0,
                        minHeight: '168px',
                        background: `${primaryLight.primaryLight1}`,
                    }}
                >
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
