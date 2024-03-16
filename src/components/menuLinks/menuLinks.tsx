import { FC, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Paths } from '../../routes/pathes';

import { CollapsedContext } from '../../reactContexts';
import { Menu, Typography } from 'antd';
import { CalendarTwoTone, HeartFilled, TrophyFilled } from '@ant-design/icons';
import { ProfileIconComponent } from '@components/customIcon/profileIcon';
import { menuItemsKeys } from './menuLinks.data';
import { getSelectedKey } from './menuLink.utils';
import { useGetAllUserTrainings } from '@hooks/useGetAllUserTrainings';

import { primaryLight } from '../../utils/constants/colors';
import classes from './menuLinks.module.css';
import classnames from 'classnames';

export const MenuLinks: FC = () => {
    const fetchAllUserTrains = useGetAllUserTrainings();
    const { collapsed } = useContext(CollapsedContext);
    const location = useLocation();

    const handleMoveToCalendarPage = () => {
        fetchAllUserTrains();
    };

    return (
        <Menu
            className={classnames(classes.menu, classes.antFixed, {
                [classes.collapsed]: collapsed,
            })}
            style={collapsed ? { width: '64px' } : { width: '100%' }}
            mode='inline'
            defaultSelectedKeys={[getSelectedKey(location.pathname)]}
        >
            <Menu.Item
                className={classnames(classes['menu__item'], {
                    [classes.collapsed]: collapsed,
                })}
                style={{ paddingLeft: `${collapsed ? '24px' : '17px'}` }}
                key={menuItemsKeys[Paths.CALENDAR_PAGE]}
                onClick={handleMoveToCalendarPage}
                icon={
                    <CalendarTwoTone
                        twoToneColor={[
                            `${primaryLight.primaryLight9}`,
                            `${primaryLight.primaryLight9}`,
                        ]}
                        className={classnames(classes['menu__item_icon'], classes.antFixed)}
                    />
                }
            >
                <Typography.Text className={classes['menu__item_text']}>Календарь</Typography.Text>
            </Menu.Item>
            <Menu.Item
                style={{ paddingLeft: `${collapsed ? '24px' : '17px'}` }}
                className={classnames(classes['menu__item'], {
                    [classes.collapsed]: collapsed,
                })}
                key={menuItemsKeys['/trains']}
                icon={
                    <HeartFilled
                        style={{ color: `${primaryLight.primaryLight9}` }}
                        className={classnames(classes['menu__item_icon'], classes.antFixed)}
                    />
                }
            >
                <Typography.Text className={classes['menu__item_text']}>Тренировки</Typography.Text>
            </Menu.Item>
            <Menu.Item
                style={{ paddingLeft: `${collapsed ? '24px' : '17px'}` }}
                className={classnames(classes['menu__item'], {
                    [classes.collapsed]: collapsed,
                })}
                key={menuItemsKeys['/trophy']}
                icon={
                    <TrophyFilled
                        style={{ color: `${primaryLight.primaryLight9}` }}
                        className={classnames(classes['menu__item_icon'], classes.antFixed)}
                    />
                }
            >
                <Typography.Text className={classes['menu__item_text']}>Достижения</Typography.Text>
            </Menu.Item>
            <Menu.Item
                style={{ paddingLeft: `${collapsed ? '24px' : '17px'}` }}
                className={classnames(classes['menu__item'], {
                    [classes.collapsed]: collapsed,
                })}
                key={menuItemsKeys['/profile']}
                icon={
                    <ProfileIconComponent
                        style={{ color: `${primaryLight.primaryLight9}` }}
                        className={classnames(classes['menu__item_icon'], classes.antFixed)}
                    />
                }
            >
                <Typography.Text className={classes['menu__item_text']}>Профиль</Typography.Text>
            </Menu.Item>
        </Menu>
    );
};
