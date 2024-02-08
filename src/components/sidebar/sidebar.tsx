import { FC } from 'react';
import { Logo } from '@components/logo';
import { MenuLinks } from '@components/menuLink';
import { ExitUser } from '@components/exitUser';

import classes from './sidebar.module.css';

export const SideBar: FC = () => {
    return (
        <div className={classes.sidebar}>
            <Logo />
            <div className={classes['sidebar__menu']}>
                <MenuLinks />
                <ExitUser />
            </div>
        </div>
    );
};
