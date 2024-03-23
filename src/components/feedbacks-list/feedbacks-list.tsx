import { FC } from 'react';
import { FeedbackItem } from '@components/feedback-item';
import { FeedbackResponseType } from '@redux/api/api-types';

import classes from './feedbacks-list.module.css';

type FeedbacksListPropsType = {
    feedbacks: FeedbackResponseType[];
    limit: number;
};

export const FeedbacksList: FC<FeedbacksListPropsType> = ({ feedbacks, limit }) => (
    <div className={classes['feedbacks-list']}>
        {feedbacks &&
            feedbacks
                .filter((_, index) => index < limit)
                .map((elem) => <FeedbackItem key={elem.id} feedbackContent={elem} />)}
    </div>
);
