import { FC } from 'react';

import { Menu, Typography } from 'antd';
import { CalendarTwoTone, HeartFilled, TrophyFilled } from '@ant-design/icons';
import { ProfileIconComponent } from '@components/customIcon/profileIcon';

import { primaryLight } from '../../utils/constants/colors';
import classes from './menuLinks.module.css';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const MenuLinks: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);

    return (
        <Menu
            className={!collapsed ? classes.menu : `${classes.menu} ${classes.collapsed}`}
            style={collapsed ? { width: '64px' } : { width: '100%' }}
            mode='inline'
        >
            <Menu.Item
                className={classes['menu__item']}
                key='calendar'
                icon={
                    <CalendarTwoTone
                        twoToneColor={`${primaryLight.primaryLight9}`}
                        className={classes['menu__item_icon']}
                    />
                }
            >
                <Typography.Text
                    className={!collapsed ? classes['menu__item_text'] : classes.hidden}
                >
                    Календарь
                </Typography.Text>
            </Menu.Item>
            <Menu.Item
                className={classes['menu__item']}
                key='trains'
                icon={
                    <HeartFilled
                        style={{ color: `${primaryLight.primaryLight9}` }}
                        className={classes['menu__item_icon']}
                    />
                }
            >
                <Typography.Text className={classes['menu__item_text']}>Тренировки</Typography.Text>
            </Menu.Item>
            <Menu.Item
                className={classes['menu__item']}
                key='trophy'
                icon={
                    <TrophyFilled
                        style={{ color: `${primaryLight.primaryLight9}` }}
                        className={classes['menu__item_icon']}
                    />
                }
            >
                <Typography.Text className={classes['menu__item_text']}>Достижения</Typography.Text>
            </Menu.Item>
            <Menu.Item
                className={classes['menu__item']}
                key='profile'
                icon={
                    <ProfileIconComponent
                        style={{ color: `${primaryLight.primaryLight9}` }}
                        className={classes['menu__item_icon']}
                    />
                }
            >
                <Typography.Text className={classes['menu__item_text']}>Профиль</Typography.Text>
            </Menu.Item>
        </Menu>
    );
};
