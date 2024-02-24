import { FC, useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { CollapsedContext } from '../../reactContexts/collapse-context';
import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Paths } from '../../routes/pathes';
import { resetCredentials } from '@redux/reducers/authSlice';

import { SideBar } from '@components/sidebar';
import { Header } from '@components/header';
import { MainContent } from '@components/mainContent';
import { Footer } from '@components/footer';
import { Switcher } from '@components/switcher/switcher';

import { Layout as AntLayout } from 'antd';
import './main-page.css';
import { primaryLight } from '../../utils/constants/colors';
import BgImg from '/images/mainBG.jpg';

const { Header: AntHeader, Footer: AntFooter, Sider, Content } = AntLayout;

export const MainPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const { collapsed } = useContext(CollapsedContext);
    const [width, setWidth] = useState(208);
    const [collapseWidth, setCollapseWidth] = useState(64);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    useEffect(() => {
        if (window.innerWidth < 590) {
            setCollapseWidth(0);
            setWidth(106);
        } else {
            setCollapseWidth(64);
        }
    }, []);

    if (!token) {
        return <Navigate to={Paths.AUTH} replace />;
    } else {
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
    }
};
