import { FC } from 'react';
import { TariffCard } from '@components/tariff-card';
import { useDrawerContext } from '@hooks/use-info-drawer';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import classes from './tariffs-list.module.css';
import moment from 'moment';
import { dateFullStringFormat, dateDayMonthFormat } from '@utils/constants/date-formats';

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
                key='pro tariff'
                tariff='pro'
                isPaid={isPaidPro}
                period={untilPaid}
                extraClickHandler={() => {
                    openDrawer();
                }}
                activateClickHandler={() => {
                    console.log('activated');
                }}
            />
        </div>
    );
};
