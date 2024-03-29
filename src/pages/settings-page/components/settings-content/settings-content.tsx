import { FC } from 'react';

import { SettingsList } from '../settings-list';
import { TariffInfoDrawer } from '../tariff-info-drawer';
import { TariffsList } from '../tariffs-list';

import classes from './settings-content.module.css';

export const SettingsContent: FC = () => (
    <div className={classes.wrapper}>
        <h4 className={classes.title}>Мой тариф</h4>
        <div className={classes.content}>
            <TariffsList />
            <SettingsList />
            <TariffInfoDrawer />
        </div>
    </div>
);
