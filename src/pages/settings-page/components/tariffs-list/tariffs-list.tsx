import { FC } from 'react';
import { TariffCard } from '@components/tariff-card';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useDrawerContext } from '@hooks/use-info-drawer';
import { dateDayMonthFormat, dateFullStringFormat } from '@utils/constants/date-formats';
import moment from 'moment';

import { DATA_TEST_ID } from '../../../../data/data-test-ids';

import classes from './tariffs-list.module.css';

export const TariffsList: FC = () => {
    const { openDrawer } = useDrawerContext();
    const expired = useAppSelector((state) => state.personalInfo.tariff?.expired) || undefined;
    const isPaidPro = expired ? moment(expired, dateFullStringFormat).isAfter(moment()) : false;
    const untilPaid = expired
        ? moment(expired, dateFullStringFormat).format(dateDayMonthFormat)
        : '';

    return (
        <div className={classes.cards}>
            <TariffCard
                key='free tariff'
                extraClickHandler={() => {
                    openDrawer();
                }}
            />
            <TariffCard
                dataTestId={DATA_TEST_ID.proTarifCard}
                key='pro tariff'
                tariff='pro'
                isPaid={isPaidPro}
                period={untilPaid}
                extraClickHandler={() => {
                    openDrawer();
                }}
                activateClickHandler={() => {
                    //
                }}
            />
        </div>
    );
};
