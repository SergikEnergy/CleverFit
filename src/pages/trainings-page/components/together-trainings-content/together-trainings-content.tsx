import { FC, useEffect } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetAllRandomPartnersQuery } from '@redux/api/trainings-api';
import { setRandomPartners } from '@redux/reducers/trainings-partners-slice';
import { useInvitationsSelector, usePartnersSelector } from '@redux/selectors';

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
    const { userPartners, togetherMode } = usePartnersSelector();
    const { userInvitations } = useInvitationsSelector();

    useEffect(() => {
        if (randomPartners && isSuccess) {
            dispatch(setRandomPartners(randomPartners));
        }
    }, [dispatch, isSuccess, randomPartners]);

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
