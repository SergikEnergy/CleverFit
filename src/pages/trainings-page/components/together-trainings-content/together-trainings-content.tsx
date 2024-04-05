import { FC, useEffect } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetAllTrainingsPartnersQuery } from '@redux/api/trainings-api';
import { setTrainingPartners } from '@redux/reducers/trainings-partners-slice';

import { EmptyTogetherTrainings } from '../empty-together-trainings';

import classes from './together-trainings-content.module.css';

export const TogetherTrainingsContent: FC = () => {
    const dispatch = useAppDispatch();

    const { data: partnersList, isSuccess } = useGetAllTrainingsPartnersQuery();

    useEffect(() => {
        if (partnersList && isSuccess) {
            dispatch(setTrainingPartners(partnersList));
        }
    }, [dispatch, isSuccess, partnersList]);

    return (
        <div className={classes.content}>
            {!partnersList || (partnersList.length === 0 && <EmptyTogetherTrainings />)}
            {/* {partnersList && partnersList.length > 0 && <ToghetherTrainings />} */}
        </div>
    );
};
