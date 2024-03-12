import { FC } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

import classes from './DrawerHeader.module.css';

interface DrawerHeaderProps {
    title: string;
    closeDrawer: () => void;
}

export const DrawerHeader: FC<DrawerHeaderProps> = ({ title, closeDrawer }) => (
    <div className={classes.header}>
        <div className={classes.icon}>
            <PlusOutlined />
        </div>
        <div className={classes.title}>{title}</div>
        <div
            className={classes.close}
            onClick={() => {
                closeDrawer();
            }}
        >
            <CloseOutlined />
        </div>
    </div>
);
