import { FC, useEffect, useState } from 'react';
import { useWindowWidth } from '@hooks/use-window-size';
import { Drawer } from 'antd';

import { useTrainingsDrawerContext } from '../../../../react-contexts';

import { FormDrawer } from './components/drawer-form/form-drawer';
import { DrawerHeader } from './components/drawer-header/drawer-header';

import classes from './trainings-drawer.module.css';

export const TrainingsDrawer: FC = () => {
    const { open: isDrawerOpen, closeDrawer } = useTrainingsDrawerContext();
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
                <DrawerHeader title='Новая тренировка' closeDrawer={closeDrawerWithCheckingData} />
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
