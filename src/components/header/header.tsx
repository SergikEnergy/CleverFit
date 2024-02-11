import { FC, useContext } from 'react';

import { CollapsedContext } from '../../reactContexts/collapse-context';
import { Button, Breadcrumb } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import classes from './header.module.css';

export const Header: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
    return (
        <div className={`${classes['header__wrapper']} wrapper`}>
            <div className={classes.navigation}>
                <Breadcrumb>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={`${classes.greeting} ${collapsed ? `${classes.collapsed}` : ''}`}>
                <div
                    className={`${classes['greeting__text']} ${
                        collapsed ? `${classes.collapsed}` : ''
                    }`}
                >
                    Приветствуем тебя в&nbsp;CleverFit — приложении,
                    <pre
                        className={`${classes.xlWidth} ${collapsed ? `${classes.collapsed}` : ''}`}
                    >
                        {'                   '}
                    </pre>{' '}
                    которое поможет тебе добиться своей мечты!
                </div>
                <div
                    className={
                        !collapsed
                            ? classes['greeting__settings']
                            : `${classes['greeting__settings']} ${classes.collapsed}`
                    }
                >
                    <Button
                        className={classes['mobile__button']}
                        block
                        type='text'
                        shape='circle'
                        icon={<SettingOutlined />}
                    />

                    <Button
                        className={classes['settings__button']}
                        block
                        type='text'
                        icon={<SettingOutlined />}
                    >
                        <span
                            className={
                                !collapsed
                                    ? classes['button__text']
                                    : `${classes['button__text']} ${classes.collapsed}`
                            }
                        >
                            Настройки
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};
