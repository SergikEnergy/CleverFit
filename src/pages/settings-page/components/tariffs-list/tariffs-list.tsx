import { FC } from 'react';
import { TariffCard } from '@components/tariff-card';
import { usePersonalInfoSelector } from '@redux/selectors';
import { dateDayMonthFormat, dateFullStringFormat } from '@utils/constants/date-formats';
import moment from 'moment';

import { DATA_TEST_ID } from '../../../../data/data-test-ids';
import { useTariffDrawerContext } from '../../../../react-contexts';

import classes from './tariffs-list.module.css';

export const TariffsList: FC = () => {
    const { openDrawer } = useTariffDrawerContext();
    const { tariff } = usePersonalInfoSelector();
    const expired = tariff?.expired || undefined;
    const untilPaid = expired
        ? moment(expired, dateFullStringFormat).format(dateDayMonthFormat)
        : '';
    const isPaidPro = !!untilPaid;

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
