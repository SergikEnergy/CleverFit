import { FC, useEffect, useState } from 'react';
import { useWindowWidth } from '@hooks/use-window-size';
import {
    DRAWER_ADD_MODE,
    DRAWER_CREATE_MODE,
    DRAWER_EDIT_MODE,
} from '@utils/constants/train-modes';
import { Drawer } from 'antd';

import { useTrainingsDrawerContext } from '../../../../react-contexts';

import { FormDrawer } from './components/drawer-form/form-drawer';
import { DrawerHeader } from './components/drawer-header/drawer-header';

import classes from './trainings-drawer.module.css';

export const TrainingsDrawer: FC = () => {
    const { open: isDrawerOpen, closeDrawer, modeDrawer } = useTrainingsDrawerContext();
    const [drawerWidth, setDrawerWidth] = useState(408);
    const innerWindowWidth = useWindowWidth();

    useEffect(() => {
        if (innerWindowWidth < 550) {
            setDrawerWidth(360);
        }
    }, [innerWindowWidth]);

    const closeDrawerWithCheckingData = () => {
        closeDrawer();
    };

    return (
        <Drawer
            className={classes.drawer}
            data-test-id='modal-drawer-right'
            title={
                <DrawerHeader
                    title={
                        (modeDrawer === DRAWER_ADD_MODE && 'Добавление упражнений') ||
                        (DRAWER_CREATE_MODE && 'Новая тренировка') ||
                        (DRAWER_EDIT_MODE && 'Редактировать тренировку')
                    }
                    closeDrawer={closeDrawerWithCheckingData}
                />
            }
            width={drawerWidth}
            maskClosable={false}
            closeIcon={null}
            open={isDrawerOpen}
            bodyStyle={{ padding: '24px 32px' }}
        >
            {isDrawerOpen && <FormDrawer />}
        </Drawer>
    );
};
