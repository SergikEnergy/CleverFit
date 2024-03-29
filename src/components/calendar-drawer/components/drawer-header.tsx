import { FC } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

import classes from './drawer-header.module.css';

type DrawerHeaderPropsType = {
    title: string;
    closeDrawer: () => void;
};

export const DrawerHeader: FC<DrawerHeaderPropsType> = ({ title, closeDrawer }) => (
    <div className={classes.header}>
        <div className={classes.icon}>
            <PlusOutlined />
        </div>
        <div className={classes.title}>{title}</div>
        <div
            role='button'
            tabIndex={0}
            onKeyDown={() => {}}
            aria-label='close-drawer'
            className={classes.close}
            data-test-id='modal-drawer-right-button-close'
            onClick={() => closeDrawer()}
        >
            <CloseOutlined />
        </div>
    </div>
);
