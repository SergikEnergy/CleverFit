import { FC, useState, useEffect, useContext, ReactNode } from 'react';
import { CollapsedContext } from '../../reactContexts/collapse-context';
import { ModalPopUp } from '@components/modalPopup';

import { SideBar } from '@components/sidebar';
import { Header } from '@components/header';
import { Switcher } from '@components/switcher/switcher';

import { Layout as AntLayout } from 'antd';
import { primaryLight } from '../../utils/constants/colors';
import BgImg from '/images/mainBG.jpg';
import './basePagesLayout.css';
import classnames from 'classnames';

const { Header: AntHeader, Sider, Content } = AntLayout;

interface BasePagesLayoutProps {
    children: ReactNode;
    isFeedbackPage?: boolean;
    isCalendarPage?: boolean;
}

export const BasePagesLayout: FC<BasePagesLayoutProps> = ({
    children,
    isFeedbackPage,
    isCalendarPage,
}) => {
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
        <>
            <ModalPopUp />
            <AntLayout
                className={classnames('base-page', {
                    ['feedback-page']: isFeedbackPage,
                    ['calendar-page']: isCalendarPage,
                })}
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
                    <SideBar isCalendarPage={isCalendarPage} />
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
                            ['calendar-header']: isCalendarPage,
                        })}
                        style={{
                            padding: 0,
                            background: `${primaryLight.primaryLight1}`,
                        }}
                    >
                        <Header hideElement={isFeedbackPage} hideForCalendar={isCalendarPage} />
                    </AntHeader>
                    <Content style={{ background: 'transparent' }}>{children}</Content>
                </AntLayout>
            </AntLayout>
        </>
    );
};
