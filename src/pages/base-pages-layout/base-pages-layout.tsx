import { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { Header } from '@components/header';
import { ModalPopUp } from '@components/modal-popup';
import { SideBar } from '@components/sidebar';
import { Switcher } from '@components/switcher/switcher';
import { Layout as AntLayout } from 'antd';
import classnames from 'classnames';

import { useCollapseContext } from '../../react-contexts';
import { primaryLight } from '../../utils/constants/colors';

import './base-pages-layout.css';

import BgImg from '/images/mainBG.jpg';

const { Header: AntHeader, Sider, Content } = AntLayout;

type BasePagesLayoutPropsType = {
    children: ReactNode;
    isFeedbackPage?: boolean;
    isCalendarPage?: boolean;
    isTrainingsPage?: boolean;
    customHeader?: boolean;
};

export const BasePagesLayout: FC<BasePagesLayoutPropsType> = ({
    children,
    isFeedbackPage,
    isCalendarPage,
    isTrainingsPage,
    customHeader,
}) => {
    const { collapsed } = useCollapseContext();
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
        <Fragment>
            <ModalPopUp />
            <AntLayout
                className={classnames('base-page', {
                    'feedback-page': isFeedbackPage,
                    'calendar-page': isCalendarPage,
                    'trainings-page': isTrainingsPage,
                })}
                style={{ background: `center / cover url(${BgImg}) no-repeat` }}
            >
                <Sider
                    className='navigation mobile__overlay antFixed'
                    collapsible={true}
                    trigger={null}
                    theme='light'
                    collapsed={collapsed}
                    width={collapsed ? collapseWidth : width}
                    breakpoint='md'
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
                    {!customHeader && (
                        <AntHeader
                            className={classnames('header', {
                                collapsed,
                                'feedback-header': isFeedbackPage,
                                'calendar-header': isCalendarPage,
                                'trainings-header': isTrainingsPage,
                            })}
                            style={{
                                padding: 0,
                                background: `${primaryLight.primaryLight1}`,
                            }}
                        >
                            <Header
                                hideElement={isFeedbackPage}
                                hideForCalendar={isCalendarPage}
                                hideForTrainings={isTrainingsPage}
                            />
                        </AntHeader>
                    )}
                    <Content style={{ background: 'transparent' }}>{children}</Content>
                </AntLayout>
            </AntLayout>
        </Fragment>
    );
};
