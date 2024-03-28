import { FC } from 'react';
import { useDrawerContext } from '@hooks/use-info-drawer';
import { useWindowWidth } from '@hooks/use-window-size';
import { Drawer } from 'antd';

import { DrawerHeader } from './drawer-header/info-drawer-header';
import { TariffsDescription } from './tariffs-description';
import { TariffsForm } from './tariffs-form/tariffs-form';

import classes from './tariff-info-drawer.module.css';

export const TariffInfoDrawer: FC = () => {
    const innerWindowWidth = useWindowWidth();
    const { open: isDrawerOpen } = useDrawerContext();

    return (
        <Drawer
            className={classes.drawer}
            open={isDrawerOpen}
            data-test-id='modal-drawer-right'
            title={<DrawerHeader title='Сравнить тарифы' />}
            width={innerWindowWidth > 550 ? 408 : 360}
            placement={innerWindowWidth > 550 ? 'right' : 'bottom'}
            maskClosable={false}
            mask={false}
            closeIcon={null}
            bodyStyle={{ padding: '24px 32px' }}
        >
            <TariffsDescription />
            <TariffsForm />
        </Drawer>
    );
};
