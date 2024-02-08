import { FC, useState } from 'react';

import { Menu, Typography } from 'antd';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import Icon, { CalendarTwoTone, HeartFilled, TrophyFilled } from '@ant-design/icons';
import { CustomIcon } from '../../customIcon/customIcon';

import { primaryLight } from '../../data/colors';
import classes from './menuLinks.module.css';

const ProfileIconComponent = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CustomIcon} {...props} />
);

export const MenuLinks: FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Menu
            className={classes.menu}
            defaultSelectedKeys={['calendar']}
            mode='inline'
            // theme='light'
            inlineCollapsed={collapsed}
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
                <Typography.Text className={classes['menu__item_text']}>Календарь</Typography.Text>
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
