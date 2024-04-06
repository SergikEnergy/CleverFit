import { FC } from 'react';

import classes from './user-training-info-line.module.css';

type UserTrainingInfoLinePropsType = {
    title: string;
    description: string;
    index?: number;
};

export const UserTrainingInfoLine: FC<UserTrainingInfoLinePropsType> = ({ title, description }) => (
    <div className={classes.line}>
        <div className={classes.title}>{title}</div>
        <div className={classes.description}>{description}</div>
    </div>
);
