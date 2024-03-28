import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useDrawerContext } from '@hooks/use-info-drawer';

import classes from './info-drawer-header.module.css';

type DrawerHeaderPropsType = {
    title: string;
};

export const DrawerHeader: FC<DrawerHeaderPropsType> = ({ title }) => {
    const { closeDrawer } = useDrawerContext();

    return (
        <div className={classes.title}>
            <div className={classes.text}>{title}</div>
            <div
                role='button'
                tabIndex={0}
                onKeyDown={() => {}}
                aria-label='close-drawer'
                className={classes.close}
                onClick={() => {
                    closeDrawer();
                }}
            >
                <CloseOutlined style={{ fontSize: 14 }} />
            </div>
        </div>
    );
};
