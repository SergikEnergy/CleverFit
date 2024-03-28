import { FC } from 'react';
import { TariffCard } from '@components/tariff-card';
import { useDrawerContext } from '@hooks/use-info-drawer';

import classes from './tariffs-list.module.css';

type TariffsListPropsType = {
    //
};

export const TariffsList: FC<TariffsListPropsType> = () => {
    const { openDrawer } = useDrawerContext();

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
