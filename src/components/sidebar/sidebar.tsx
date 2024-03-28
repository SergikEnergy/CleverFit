import { FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router';
import { ExitUser } from '@components/exit-user';
import { Logo } from '@components/logo';
import { MenuLinks } from '@components/menu-links';
import classnames from 'classnames';

import classes from './sidebar.module.css';

export const SideBar: FC = () => {
    const location = useLocation();
    const isProfilePage = location.pathname.includes('profile');
    const isSettingsPage = location.pathname.includes('settings');
    const isCalendarPage = location.pathname.includes('calendar');

    return (
        <div
            className={classnames(classes.sidebar, {
                [classes.calendar]: isCalendarPage,
                [classes.profile]: isProfilePage,
                [classes.settings]: isSettingsPage,
            })}
        >
            <Logo />
            <MenuLinks />
            <ExitUser />
        </div>
    );
};
