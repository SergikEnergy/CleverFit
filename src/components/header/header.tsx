import { FC } from 'react';
import { Button, Breadcrumb } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import classes from './header.module.css';

export const Header: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);
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
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </div>
                <div className={classes['greeting__settings']}>
                    <Button
                        className={classes['settings__button']}
                        block
                        type='text'
                        icon={<SettingOutlined />}
                    >
                        Настройки
                    </Button>
                </div>
            </div>
        </div>
    );
};
