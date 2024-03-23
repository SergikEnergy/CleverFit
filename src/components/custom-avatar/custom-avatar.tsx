import { FC } from 'react';

import classes from './custom-avatar.module.css';

type CustomAvatarPropsType = {
    url: string;
};

export const CustomAvatar: FC<CustomAvatarPropsType> = ({ url }) => (
    <div className={classes.avatar}>
        <img src={url} alt='user' />
    </div>
);
