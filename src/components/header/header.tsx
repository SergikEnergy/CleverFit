import { FC, useContext } from 'react';

import { CollapsedContext } from '../../reactContexts/collapse-context';
import { Button, Breadcrumb } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import classes from './header.module.css';
import classnames from 'classnames';

export const Header: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
    return (
        <div className={`${classes['header__wrapper']} wrapper`}>
            <div className={classes.navigation}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <span className={classes.antFixed}>Главная</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={classnames(classes.greeting, { [classes.collapsed]: collapsed })}>
                <div
                    className={classnames(classes['greeting__text'], {
                        [classes.collapsed]: collapsed,
                    })}
                >
                    Приветствуем тебя в&nbsp;CleverFit — приложении,
                    <pre
                        className={classnames(classes.xlWidth, { [classes.collapsed]: collapsed })}
                    >
                        {'                   '}
                    </pre>{' '}
                    которое поможет тебе добиться своей мечты!
                </div>
                <div
                    className={classnames(classes['greeting__settings'], {
                        [classes.collapsed]: collapsed,
                    })}
                >
                    <Button
                        className={classnames(classes['mobile__button'], classes.antFixed)}
                        type='text'
                        shape='circle'
                        icon={<SettingOutlined />}
                    />

                    <Button
                        className={classes['settings__button']}
                        type='text'
                        icon={<SettingOutlined />}
                    >
                        <span
                            className={classnames(classes['button__text'], {
                                [classes.collapsed]: collapsed,
                            })}
                        >
                            Настройки
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};
