import { FC } from 'react';
import { Logo } from '@components/logo';

import classes from './sidebar.module.css';

export const SideBar: FC = () => {
    return (
        <div>
            <Logo />
        </div>
    );
};
