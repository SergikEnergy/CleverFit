import { FC } from 'react';
import { TariffCard } from '@components/tariff-card';

import classes from './tariffs-list.module.css';

type TariffsListPropsType = {
    //
};

export const TariffsList: FC<TariffsListPropsType> = () => (
    <div className={classes.cards}>
        <TariffCard key='free tariff' extraClickHandler={() => {}} />
        <TariffCard key='pro tariff' tariff='pro' extraClickHandler={() => {}} />
    </div>
);
