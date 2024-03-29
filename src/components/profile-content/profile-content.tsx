import { FC } from 'react';
import { FormPersonalInfo } from '@components/form-personal-info';

import classes from './profile-content.module.css';

export const ProfileContent: FC = () => (
    <div className={classes.content}>
        <div className={classes.profile}>
            <FormPersonalInfo />
        </div>
    </div>
);
