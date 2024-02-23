import { FC, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CollapsedContext } from '../../reactContexts/collapse-context';

import { SideBar } from '@components/sidebar';
import { Header } from '@components/header';
import { MainContent } from '@components/mainContent';
import { Footer } from '@components/footer';
import { Switcher } from '@components/switcher/switcher';

import { Layout as AntLayout } from 'antd';
import './main-page.css';

const { Header: AntHeader, Footer: AntFooter, Sider, Content } = AntLayout;
import { primaryLight } from '../../utils/constants/colors';
import BgImg from '/images/mainBG.jpg';

export const MainPage: FC = () => {
    const location = useLocation();
    console.log(location);
    const { collapsed } = useContext(CollapsedContext);

    const [width, setWidth] = useState(208);
    const [collapseWidth, setCollapseWidth] = useState(64);

    useEffect(() => {
        if (window.innerWidth < 590) {
            setCollapseWidth(0);
            setWidth(106);
        } else {
            setCollapseWidth(64);
        }
    }, []);

    return (
        <AntLayout
            className='main-page'
            style={{ background: `center / cover url(${BgImg}) no-repeat` }}
        >
            <Sider
                className='navigation mobile__overlay antFixed'
                collapsible
                trigger={null}
                theme='light'
                collapsed={collapsed}
                width={!collapsed ? width : collapseWidth}
                breakpoint={'md'}
                onBreakpoint={(broken) => {
                    if (broken) {
                        setCollapseWidth(0);
                        if (!collapsed) {
                            setWidth(106);
                        }
                    } else {
                        setWidth(208);
                        setCollapseWidth(64);
                    }
                }}
                collapsedWidth={collapseWidth}
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
                    className={!collapsed ? 'header' : 'header collapsed'}
                    style={{
                        padding: 0,
                        background: `${primaryLight.primaryLight1}`,
                    }}
                >
                    <Header />
                </AntHeader>
                <Content style={{ background: 'transparent' }}>
                    <MainContent />
                    <AntFooter
                        className={!collapsed ? 'footer' : 'footer collapsed'}
                        style={{ padding: 0, background: 'transparent' }}
                    >
                        <Footer />
                    </AntFooter>
                </Content>
            </AntLayout>
        </AntLayout>
    );
};
