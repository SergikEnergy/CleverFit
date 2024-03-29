import { FC } from 'react';
import { SettingsButton } from '@components/header/components';
import classnames from 'classnames';

import classes from './profile-header.module.css';

export const ProfileHeader: FC = () => (
    <header className={classes.header}>
        <div className={classnames(classes.header__wrapper, 'wrapper')}>
            <div className={classes.title}>Профиль</div>
            <div className={classes.settings}>
                <SettingsButton forProfile={true} />
            </div>
        </div>
    </header>
);
