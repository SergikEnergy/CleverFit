import { FC } from 'react';

import classes from './CustomAvatar.module.css';

interface CustomAvatarProps {
    url: string;
}

export const CustomAvatar: FC<CustomAvatarProps> = ({ url }) => (
    <div className={classes.avatar}>
        <img src={url} alt='user image' />
    </div>
);
