import { FC, useState } from 'react';
import { FeedbacksActionButtons } from '@components/feedback-action-buttons';
import { FeedbacksList } from '@components/feedbacks-list';
import { FeedbackResponseType } from '@redux/api/api-types';

import classes from './feedbacks.module.css';

type FeedbacksPropsType = {
    feedbacks: FeedbackResponseType[];
};

export const Feedbacks: FC<FeedbacksPropsType> = ({ feedbacks }) => {
    const hiddenCommentText = 'Свернуть все отзывы';
    const spreadCommentText = 'Развернуть все отзывы';
    const [textButton, setTextButton] = useState<string>(spreadCommentText);
    const [limit, setLimit] = useState(4);

    const sortFeedbacksByDateAscend = (data: FeedbackResponseType[]) => {
        if (data.length === 1) {
            return data;
        }

        return data.sort((item1: FeedbackResponseType, item2: FeedbackResponseType) => {
            const dataItem1 = new Date(item1.createdAt);
            const dataItem2 = new Date(item2.createdAt);

            return -dataItem1.getTime() + dataItem2.getTime();
        });
    };

    const toggleAllComment = () => {
        setLimit((prev) => (prev === 4 && Array.isArray(feedbacks) ? feedbacks.length : 4));
        setTextButton((prev) =>
            prev === spreadCommentText ? hiddenCommentText : spreadCommentText,
        );
    };

    return (
        <div className={classes.feedbacks}>
            <FeedbacksList feedbacks={sortFeedbacksByDateAscend([...feedbacks])} limit={limit} />
            <FeedbacksActionButtons allReviewAction={toggleAllComment} buttonText={textButton} />
        </div>
    );
};
