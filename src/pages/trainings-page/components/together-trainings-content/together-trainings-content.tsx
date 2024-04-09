import { FC, useEffect } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import {
    useGetAllRandomPartnersQuery,
    useGetAllTrainingsPartnersQuery,
} from '@redux/api/trainings-api';
import {
    setRandomPartners,
    setSimilarPartners,
    setTrainingPartners,
} from '@redux/reducers/trainings-partners-slice';
import { useInvitationsSelector, usePartnersSelector } from '@redux/selectors';
import { dummyAllowedTrainings } from '@utils/constants/allowed-trainings';

import { BaseLayoutTogether } from '../base-layout-together';
import { EmptyPartnersBlock } from '../empty-partners-block';
import { MyPartnersBlock } from '../my-partners-block';
import { RandomPartnersBlock } from '../random-partners-block';
import { SimilarPartnersBlock } from '../similar-partners-block';
import { UserMessagesBlock } from '../user-messages-block/user-messages-block';

import classes from './together-trainings-content.module.css';

export const TogetherTrainingsContent: FC = () => {
    const dispatch = useAppDispatch();
    const { data: randomPartners, isSuccess } = useGetAllRandomPartnersQuery();
    const { data: allUserPartners, isSuccess: isSuccessFetchedAllPartners } =
        useGetAllTrainingsPartnersQuery();
    const { userPartners, togetherMode, trainingType } = usePartnersSelector();
    const { userInvitations } = useInvitationsSelector();
    const nameFromTrainingType = dummyAllowedTrainings[trainingType.toLowerCase()];

    useEffect(() => {
        if (randomPartners && isSuccess) {
            const similarPartners = randomPartners.filter(
                (user) => user.trainingType.toLowerCase() === nameFromTrainingType,
            );

            dispatch(setRandomPartners(randomPartners));

            if (similarPartners.length > 0) dispatch(setSimilarPartners(similarPartners));
        }
    }, [dispatch, isSuccess, randomPartners, nameFromTrainingType]);

    useEffect(() => {
        if (allUserPartners && isSuccessFetchedAllPartners) {
            dispatch(setTrainingPartners(allUserPartners));
        }
    }, [dispatch, isSuccessFetchedAllPartners, allUserPartners]);
    console.log(togetherMode);

    return (
        <div className={classes.content}>
            {togetherMode === 'user' && userInvitations.length > 0 && <UserMessagesBlock />}
            {togetherMode === 'user' && (
                <BaseLayoutTogether>
                    {userPartners.length === 0 && <EmptyPartnersBlock />}
                    {userPartners.length > 0 && <MyPartnersBlock />}
                </BaseLayoutTogether>
            )}
            {togetherMode === 'random' && <RandomPartnersBlock />}
            {togetherMode === 'similar' && <SimilarPartnersBlock />}
            {togetherMode === 'partners' && userPartners.length > 0 && <MyPartnersBlock />}
            {togetherMode === 'partners' && userPartners.length === 0 && <EmptyPartnersBlock />}
        </div>
    );
};
