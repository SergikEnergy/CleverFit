import { FC, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarTwoTone, HeartFilled, TrophyFilled } from '@ant-design/icons';
import { ProfileIconComponent } from '@components/custom-icons/profile-icon';
import { useGetAllUserTrainings } from '@hooks/use-get-all-user-trainings';
import { history } from '@redux/configure-store';
import { Menu, Typography } from 'antd';
import classnames from 'classnames';

import { CollapsedContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';
import { primaryLight } from '../../utils/constants/colors';

import { getSelectedKey } from './menu-link.utils';
import { menuItemsKeys } from './menu-links.data';

import classes from './menu-links.module.css';

export const MenuLinks: FC = () => {
    const fetchAllUserTrains = useGetAllUserTrainings();
    const { collapsed } = useContext(CollapsedContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleMoveToCalendarPage = () => {
        fetchAllUserTrains();
        history.push(Paths.CALENDAR_PAGE, { allowRequest: true });
    };

    const handleMoveToProfilePage = () => {
        navigate(Paths.PROFILE_PAGE, { replace: true });
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
                className={classnames(classes.menu__item, {
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
                        className={classnames(classes.menu__item_icon, classes.antFixed)}
                    />
                }
            >
                <Typography.Text className={classes.menu__item_text}>Календарь</Typography.Text>
            </Menu.Item>
            <Menu.Item
                style={{ paddingLeft: `${collapsed ? '24px' : '17px'}` }}
                className={classnames(classes.menu__item, {
                    [classes.collapsed]: collapsed,
                })}
                key={menuItemsKeys['/trains']}
                icon={
                    <HeartFilled
                        style={{ color: `${primaryLight.primaryLight9}` }}
                        className={classnames(classes.menu__item_icon, classes.antFixed)}
                    />
                }
            >
                <Typography.Text className={classes.menu__item_text}>Тренировки</Typography.Text>
            </Menu.Item>
            <Menu.Item
                style={{ paddingLeft: `${collapsed ? '24px' : '17px'}` }}
                className={classnames(classes.menu__item, {
                    [classes.collapsed]: collapsed,
                })}
                key={menuItemsKeys['/trophy']}
                icon={
                    <TrophyFilled
                        style={{ color: `${primaryLight.primaryLight9}` }}
                        className={classnames(classes.menu__item_icon, classes.antFixed)}
                    />
                }
            >
                <Typography.Text className={classes.menu__item_text}>Достижения</Typography.Text>
            </Menu.Item>
            <Menu.Item
                style={{ paddingLeft: `${collapsed ? '24px' : '17px'}` }}
                className={classnames(classes.menu__item, {
                    [classes.collapsed]: collapsed,
                })}
                onClick={handleMoveToProfilePage}
                key={menuItemsKeys['/profile']}
                icon={
                    <ProfileIconComponent
                        style={{ color: `${primaryLight.primaryLight9}` }}
                        className={classnames(classes.menu__item_icon, classes.antFixed)}
                    />
                }
            >
                <Typography.Text className={classes.menu__item_text}>Профиль</Typography.Text>
            </Menu.Item>
        </Menu>
    );
};
