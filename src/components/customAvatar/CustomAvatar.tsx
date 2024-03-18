import { FC } from 'react';

import classes from './CustomAvatar.module.css';

type CustomAvatarPropsType = {
    url: string;
};

export const CustomAvatar: FC<CustomAvatarPropsType> = ({ url }) => (
    <div className={classes.avatar}>
        <img src={url} alt='user image' />
    </div>
);
