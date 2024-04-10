import { FC } from 'react';
import { useWindowWidth } from '@hooks/use-window-size';
import { usePersonalInfoSelector } from '@redux/selectors';
import { dateDayMonthFormat, dateFullStringFormat } from '@utils/constants/date-formats';
import { Drawer } from 'antd';
import moment from 'moment';

import { DATA_TEST_ID } from '../../../../data/data-test-ids';
import { useTariffDrawerContext } from '../../../../react-contexts';

import { DrawerHeader } from './drawer-header/info-drawer-header';
import { TariffsForm } from './tariffs-form/tariffs-form';
import { TariffsDescription } from './tariffs-description';

import classes from './tariff-info-drawer.module.css';

export const TariffInfoDrawer: FC = () => {
    const innerWindowWidth = useWindowWidth();
    const { open: isDrawerOpen } = useTariffDrawerContext();
    const { tariff } = usePersonalInfoSelector();
    const expired = tariff?.expired || undefined;
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
