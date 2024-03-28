import { FC } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useDrawerContext } from '@hooks/use-info-drawer';
import { useWindowWidth } from '@hooks/use-window-size';
import { dateDayMonthFormat, dateFullStringFormat } from '@utils/constants/date-formats';
import { Drawer } from 'antd';
import moment from 'moment';

import { DATA_TEST_ID } from '../../../../data/data-test-ids';

import { DrawerHeader } from './drawer-header/info-drawer-header';
import { TariffsForm } from './tariffs-form/tariffs-form';
import { TariffsDescription } from './tariffs-description';

import classes from './tariff-info-drawer.module.css';

export const TariffInfoDrawer: FC = () => {
    const innerWindowWidth = useWindowWidth();
    const { open: isDrawerOpen } = useDrawerContext();
    const expired = useAppSelector((state) => state.personalInfo.tariff?.expired) || undefined;
    const untilPaid = expired
        ? moment(expired, dateFullStringFormat).format(dateDayMonthFormat)
        : '';
    const isPaidPro = !!untilPaid;

    return (
        isDrawerOpen && (
            <Drawer
                data-test-id={DATA_TEST_ID.tariffSider}
                className={classes.drawer}
                open={isDrawerOpen}
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
        )
    );
};
