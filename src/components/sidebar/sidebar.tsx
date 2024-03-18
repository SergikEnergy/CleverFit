import { FC } from 'react';
import { Logo } from '@components/logo';
import { MenuLinks } from '@components/menuLinks';
import { ExitUser } from '@components/exitUser';

import classes from './sidebar.module.css';
import classnames from 'classnames';

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
