import { FC, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import classnames from 'classnames';

import { CollapsedContext } from '../../react-contexts';

import { breadcrumbsInitialItems } from './header.data';
import { prepareDataForBreadCrumbs } from './header.utils';

import classes from './header.module.css';

type HeaderPropsType = {
    hideElement?: boolean;
    hideForCalendar?: boolean;
};

export const Header: FC<HeaderPropsType> = ({ hideElement, hideForCalendar }) => {
    const { collapsed } = useContext(CollapsedContext);
    const [breadCrumbsItems, setBreadCrumbsItems] = useState(breadcrumbsInitialItems);
    const location = useLocation();

    useEffect(() => {
        const dataForBreadcrumbs = prepareDataForBreadCrumbs(location.pathname);

        setBreadCrumbsItems(dataForBreadcrumbs);
    }, [location.pathname]);

    return (
        <div className={classnames(classes.header__wrapper, 'wrapper')}>
            <div className={classes.navigation}>
                <Breadcrumb className={classes.breadcrumbs}>
                    {breadCrumbsItems.map((breadcrumb) => (
                        <Breadcrumb.Item key={breadcrumb.key}>
                            <Link to={breadcrumb.path} className={classes.antFixed}>
                                {breadcrumb.pathName}
                            </Link>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
            {!hideElement && (
                <div
                    className={classnames(classes.greeting, {
                        [classes.collapsed]: collapsed,
                        [classes.calendar__settings_wrapper]: hideForCalendar,
                    })}
                >
                    {!hideForCalendar && (
                        <div
                            className={classnames(classes.greeting__text, {
                                [classes.collapsed]: collapsed,
                            })}
                        >
                            Приветствуем тебя в&nbsp;CleverFit — приложении,
                            <pre
                                className={classnames(classes.xlWidth, {
                                    [classes.collapsed]: collapsed,
                                })}
                            >
                                {'                   '}
                            </pre>{' '}
                            которое поможет тебе добиться своей мечты!
                        </div>
                    )}
                    <div
                        className={classnames(classes.greeting__settings, {
                            [classes.collapsed]: collapsed,
                        })}
                    >
                        <Button
                            className={classnames(classes.mobile__button, classes.antFixed, {
                                [classes['calendar-mobile']]: hideForCalendar,
                            })}
                            type='text'
                            shape='circle'
                            icon={<SettingOutlined />}
                        />

                        <Button
                            className={classes.settings__button}
                            type='text'
                            icon={<SettingOutlined />}
                        >
                            <span
                                className={classnames(classes.button__text, {
                                    [classes.collapsed]: collapsed,
                                })}
                            >
                                Настройки
                            </span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
