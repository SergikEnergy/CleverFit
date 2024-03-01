import { FC } from 'react';
import { BaseMainFeedbacksLayout } from '@pages/baseMainFeedbacks';
import classes from './feedbacks-page.module.css';

export const FeedbacksPage: FC = () => {
    return (
        <BaseMainFeedbacksLayout isFeedbackPage={true}>
            Welcome to feedbacks page
        </BaseMainFeedbacksLayout>
    );
};
