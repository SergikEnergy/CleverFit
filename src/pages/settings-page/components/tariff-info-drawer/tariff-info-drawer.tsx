import { FC } from 'react';
import { useDrawerContext } from '@hooks/use-info-drawer';
import { useWindowWidth } from '@hooks/use-window-size';
import { Drawer } from 'antd';

import { DrawerHeader } from './drawer-header/info-drawer-header';
import { TariffsDescription } from './tariffs-description';
import { TariffsForm } from './tariffs-form/tariffs-form';
import moment from 'moment';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { dateFullStringFormat, dateDayMonthFormat } from '@utils/constants/date-formats';

import classes from './tariff-info-drawer.module.css';

export const TariffInfoDrawer: FC = () => {
    const innerWindowWidth = useWindowWidth();
    const { open: isDrawerOpen } = useDrawerContext();
    const expired = useAppSelector((state) => state.personalInfo.tariff?.expired) || undefined;
    const isPaidPro = expired ? moment(expired, dateFullStringFormat).isAfter(moment()) : false;
    const untilPaid = expired
        ? moment(expired, dateFullStringFormat).format(dateDayMonthFormat)
        : '';

    return (
        <Drawer
            className={classes.drawer}
            open={isDrawerOpen}
            data-test-id='modal-drawer-right'
            title={<DrawerHeader title='Сравнить тарифы' />}
            width={innerWindowWidth > 550 ? 408 : 360}
            placement='right'
            maskClosable={false}
            mask={false}
            closeIcon={null}
            bodyStyle={{ padding: '24px 32px' }}
        >
            <TariffsDescription isPaid={isPaidPro} untilPaid={untilPaid} />
            {!isPaidPro && <TariffsForm />}
        </Drawer>
    );
};
