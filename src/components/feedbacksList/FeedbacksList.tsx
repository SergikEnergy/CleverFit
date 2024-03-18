import { FC } from 'react';
import { FeedbackResponseType } from '@redux/API/api-types';
import { FeedbackItem } from '@components/feedbackItem';

import classes from './FeedbacksList.module.css';

type FeedbacksListPropsType = {
    feedbacks: FeedbackResponseType[];
    limit: number;
};

export const FeedbacksList: FC<FeedbacksListPropsType> = ({ feedbacks, limit }) => (
    <div className={classes['feedbacks-list']}>
        {feedbacks &&
            feedbacks
                .filter((_, index) => index < limit)
                .map((elem) => {
                    return <FeedbackItem key={elem.id} feedbackContent={elem} />;
                })}
    </div>
);
