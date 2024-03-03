import { FC } from 'react';
import { IFeedbackResponse } from '@redux/API/api-types';
import { FeedbackItem } from '@components/feedbackItem';

import classes from './FeedbacksList.module.css';

interface IFeedbacksListProps {
    feedbacks: IFeedbackResponse[];
    limit: number;
}

export const FeedbacksList: FC<IFeedbacksListProps> = ({ feedbacks, limit }) => (
    <div className={classes['feedbacks-list']}>
        {feedbacks
            .filter((_, index) => index < limit)
            .map((elem) => {
                return <FeedbackItem key={elem.id} feedbackContent={elem} />;
            })}
    </div>
);
