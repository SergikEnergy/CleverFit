import { FC } from 'react';
import { useUserTrainingsSelector } from '@redux/selectors';

import { EmptyTrainings } from '../empty-trainings';
import { MyTrainingsTable } from '../my-trainings-table/my-trainings-table';

import classes from './my-trainings-content.module.css';

export const MyTrainingsContent: FC = () => {
    const { userTrainings } = useUserTrainingsSelector();

    return (
        <div className={classes.content}>
            {!userTrainings || (userTrainings.length === 0 && <EmptyTrainings />)}
            {userTrainings && userTrainings.length > 0 && <MyTrainingsTable />}
        </div>
    );
};
