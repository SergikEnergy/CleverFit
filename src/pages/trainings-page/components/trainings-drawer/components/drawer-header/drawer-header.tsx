import { FC } from 'react';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { DRAWER_EDIT_MODE } from '@utils/constants/train-modes';

import { WORKOUT_DATA_TEST_ID } from '../../../../../../data/data-test-ids';
import { useTrainingsDrawerContext } from '../../../../../../react-contexts';

import classes from './drawer-header.module.css';

type DrawerHeaderPropsType = {
    title: string;
    closeDrawer: () => void;
};

export const DrawerHeader: FC<DrawerHeaderPropsType> = ({ title, closeDrawer }) => {
    const { modeDrawer } = useTrainingsDrawerContext();

    return (
        <div className={classes.header}>
            <div className={classes.icon}>
                {modeDrawer === DRAWER_EDIT_MODE ? <EditOutlined /> : <PlusOutlined />}
            </div>
            <div className={classes.title}>{title}</div>
            <div
                role='button'
                tabIndex={0}
                onKeyDown={() => {}}
                aria-label='close-drawer'
                className={classes.close}
                data-test-id={WORKOUT_DATA_TEST_ID.modalDrawerRightButtonClose}
                onClick={() => closeDrawer()}
            >
                <CloseOutlined />
            </div>
        </div>
    );
};
