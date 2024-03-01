import { FC } from 'react';
import { BaseMainFeedbacksLayout } from '@pages/baseMainFeedbacks';
import { WithoutComments } from '@components/withoutComments';

import classes from './feedbacks-page.module.css';

export const FeedbacksPage: FC = () => {
    return (
        <BaseMainFeedbacksLayout isFeedbackPage={true}>
            <WithoutComments />
        </BaseMainFeedbacksLayout>
    );
};
