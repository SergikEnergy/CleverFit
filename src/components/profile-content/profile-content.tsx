import { FC } from 'react';
import { FormPersonalInfo } from '@components/form-personal-info';

import classes from './profile-content.module.css';

type ProfileContentPropsType = {
    //
};

export const ProfileContent: FC<ProfileContentPropsType> = () => (
    <div className={classes.content}>
        <div className={classes.profile}>
            <FormPersonalInfo />
        </div>
    </div>
);
