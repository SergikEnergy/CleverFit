import { FC } from 'react';
import { Logo } from '@components/logo';
import { MenuLinks } from '@components/menuLinks';
import { ExitUser } from '@components/exitUser';

import classes from './sidebar.module.css';

export const SideBar: FC = () => (
    <div className={classes.sidebar}>
        <Logo />
        <MenuLinks />
        <ExitUser />
    </div>
);
