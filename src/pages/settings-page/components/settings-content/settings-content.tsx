import { FC } from 'react';

import { TariffsList } from '../tariffs-list';

import classes from './settings-content.module.css';

type SettingsContentTypeProps = {
    //
};

export const SettingsContent: FC<SettingsContentTypeProps> = () => (
    <div className={classes.wrapper}>
        <h4 className={classes.title}>Мой тариф</h4>
        <div className={classes.content}>
            <TariffsList />
            {/* <SettingsList /> */}
            {/* <TarifInfoDrawer/> */}
        </div>
    </div>
);
