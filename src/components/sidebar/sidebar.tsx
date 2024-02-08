import { FC } from 'react';
import { Logo } from '@components/logo';

import classes from './sidebar.module.css';
import { MenuLinks } from '@components/menuLink';

export const SideBar: FC = () => {
    return (
        <div className={classes.sidebar}>
            <Logo />
            <MenuLinks />
        </div>
    );
};
