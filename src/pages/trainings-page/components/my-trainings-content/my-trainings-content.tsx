import { FC } from 'react';

import { EmptyTrainings } from '../empty-trainings';

import classes from './my-trainings-content.module.css';

export const MyTrainingsContent: FC = () => (
    <div className={classes.content}>
        <EmptyTrainings />
    </div>
);
