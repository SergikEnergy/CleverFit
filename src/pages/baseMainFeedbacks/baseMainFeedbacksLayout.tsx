import { FC, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { CollapsedContext } from '../../reactContexts/collapse-context';
import { ModalPopUp } from '@components/modalPopup';
import { ModalFeedbackContextProvider } from '../../reactContexts/modalFeedbackContextProvider';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '../../routes/pathes';

import { SideBar } from '@components/sidebar';
import { Header } from '@components/header';
import { Switcher } from '@components/switcher/switcher';

import { Layout as AntLayout } from 'antd';
import { primaryLight } from '../../utils/constants/colors';
import BgImg from '/images/mainBG.jpg';
import './baseMainFeedbacksLayout.css';
import classnames from 'classnames';

const { Header: AntHeader, Sider, Content } = AntLayout;

interface BaseMainFeedbacksLayoutProps {
    children: ReactNode;
    isFeedbackPage?: boolean;
}

export const BaseMainFeedbacksLayout: FC<BaseMainFeedbacksLayoutProps> = ({
    children,
    isFeedbackPage,
}) => {
    const navigate = useNavigate();
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
            <ModalFeedbackContextProvider>
                <ModalPopUp />
                <AntLayout
                    className={classnames('base-page', { ['feedback-page']: isFeedbackPage })}
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
                        className='base-content'
                        style={{
                            background: 'transparent',
                        }}
                    >
                        <AntHeader
                            className={classnames('header', {
                                ['collapsed']: collapsed,
                                ['feedback-header']: isFeedbackPage,
                            })}
                            style={{
                                padding: 0,
                                background: `${primaryLight.primaryLight1}`,
                            }}
                        >
                            <Header hideElement={isFeedbackPage} />
                        </AntHeader>
                        <Content style={{ background: 'transparent' }}>{children}</Content>
                    </AntLayout>
                </AntLayout>
            </ModalFeedbackContextProvider>
        );
    }
};
