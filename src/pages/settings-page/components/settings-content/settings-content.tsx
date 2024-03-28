import { FC } from 'react';
import { useDrawerContext } from '@hooks/use-info-drawer';

import { SettingsList } from '../settings-list';
import { TariffInfoDrawer } from '../tariff-info-drawer';
import { TariffsList } from '../tariffs-list';

import classes from './settings-content.module.css';

type SettingsContentTypeProps = {
    //
};

export const SettingsContent: FC<SettingsContentTypeProps> = () => {
    const bb = true;

    return (
        <div className={classes.wrapper}>
            <h4 className={classes.title}>Мой тариф</h4>
            <div className={classes.content}>
                <TariffsList />
                <SettingsList />
                <TariffInfoDrawer />
            </div>
        </div>
    );
};
