import { FC } from 'react';
import { IFeedbackResponse } from '@redux/API/api-types';
import { UserOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { CustomAvatar } from '@components/customAvatar';
import { getFormattedDate } from './FeedbackItem.utils';
import { Rate } from 'antd';

import classes from './FeedbackItem.module.css';

interface IFeedbackItemProps {
    feedbackContent: IFeedbackResponse;
}

export const FeedbackItem: FC<IFeedbackItemProps> = ({ feedbackContent }) => {
    const dateFormatted = getFormattedDate(feedbackContent.createdAt);
    return (
        <div className={classes.feedback}>
            <div className={classes.user}>
                <div className={classes.avatar}>
                    {!feedbackContent.imageSrc ? (
                        <UserOutlined style={{ fontSize: '20px' }} />
                    ) : (
                        <CustomAvatar url={feedbackContent.imageSrc} />
                    )}
                </div>
                <div className={classes.name}>{feedbackContent.fullName ?? 'Пользователь'}</div>
            </div>
            <div className={classes.description}>
                <div className={classes.title}>
                    <div className={classes.rating}>
                        <Rate
                            style={{ fontSize: '16px', height: '16px' }}
                            disabled
                            value={feedbackContent.rating}
                            character={({ index }) => {
                                if (index !== undefined && index < feedbackContent.rating) {
                                    return <StarFilled style={{ color: '#d89614' }} />;
                                }

                                return <StarOutlined style={{ color: '#d89614' }} />;
                            }}
                        />
                    </div>
                    <div className={classes.date}>{dateFormatted}</div>
                </div>
                <div className={classes.comment}>{feedbackContent.message}</div>
            </div>
        </div>
    );
};
