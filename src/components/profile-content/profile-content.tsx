import { FC } from 'react';

import classes from './profile-content.module.css';

type ProfileContentPropsType = {
    //
};

export const ProfileContent: FC<ProfileContentPropsType> = () => (
    <div className={classes.content}>
        <div className={classes.profile}>
            {' '}
            {/* <EditPersonalInfoForm /> */}
            dddd
        </div>
    </div>
);
