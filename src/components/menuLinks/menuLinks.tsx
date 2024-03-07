import { FC, useContext } from 'react';
import { history } from '@redux/configure-store';
import { Paths } from '../../routes/pathes';

import { CollapsedContext } from '../../reactContexts/collapse-context';
import { Menu, Typography } from 'antd';
import { CalendarTwoTone, HeartFilled, TrophyFilled } from '@ant-design/icons';
import { ProfileIconComponent } from '@components/customIcon/profileIcon';

import { primaryLight } from '../../utils/constants/colors';
import classes from './menuLinks.module.css';
import classnames from 'classnames';

export const MenuLinks: FC = () => {
    const { collapsed } = useContext(CollapsedContext);

    const handleMoveToCalendarPage = () => {
        history.push(Paths.CALENDAR_PAGE, { allowRequest: true });
    };

    return (
        <Menu
            className={classnames(classes.menu, classes.antFixed, {
                [classes.collapsed]: collapsed,
            })}
            style={collapsed ? { width: '64px' } : { width: '100%' }}
            mode='inline'
        >
            <Menu.Item
                className={classnames(classes['menu__item'], {
                    [classes.collapsed]: collapsed,
                })}
                style={{ paddingLeft: `${collapsed ? '24px' : '17px'}` }}
                key='calendar'
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
                key='trains'
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
                key='trophy'
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
                key='profile'
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
