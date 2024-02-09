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
import { primaryLight } from '../../utils/constants/colors';
import BgImg from '/images/mainBG.jpg';

export const MainPage: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);

    return (
        <AntLayout
            className='main-page'
            style={{ background: `center / cover url(${BgImg}) no-repeat` }}
        >
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
            <AntLayout
                className='main-content'
                style={{
                    background: 'transparent',
                }}
            >
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
                <Content style={{ background: 'transparent' }}>
                    <MainContent />
                    <AntFooter className='footer' style={{ padding: 0, background: 'transparent' }}>
                        <Footer />
                    </AntFooter>
                </Content>
            </AntLayout>
        </AntLayout>
    );
};
