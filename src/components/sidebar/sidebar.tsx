import { FC } from 'react';
import { ExitUser } from '@components/exit-user';
import { Logo } from '@components/logo';
import { MenuLinks } from '@components/menu-links';
import classnames from 'classnames';

import classes from './sidebar.module.css';

type SideBarPropsType = {
    isCalendarPage?: boolean;
};

export const SideBar: FC<SideBarPropsType> = ({ isCalendarPage }) => (
    <div className={classnames(classes.sidebar, { [classes.calendar]: isCalendarPage })}>
        <Logo />
        <MenuLinks />
        <ExitUser />
    </div>
);
