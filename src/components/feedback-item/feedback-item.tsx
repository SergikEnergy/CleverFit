import { FC } from 'react';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { CustomAvatar } from '@components/custom-avatar';
import { FeedbackResponseType } from '@redux/api/api-types';
import { Rate } from 'antd';

import { getFormattedDate } from './feedback-item.utils';

import classes from './feedback-item.module.css';

type FeedbackItemPropsType = {
    feedbackContent: FeedbackResponseType;
};

export const FeedbackItem: FC<FeedbackItemPropsType> = ({ feedbackContent }) => {
    const dateFormatted = getFormattedDate(feedbackContent.createdAt);

    return (
        <div className={classes.feedback}>
            <div className={classes.user}>
                <div className={classes.avatar}>
                    {feedbackContent.imageSrc ? (
                        <CustomAvatar url={feedbackContent.imageSrc} />
                    ) : (
                        <UserOutlined style={{ fontSize: '20px' }} />
                    )}
                </div>
                <div className={classes.name}>{feedbackContent.fullName ?? 'Пользователь'}</div>
            </div>
            <div className={classes.description}>
                <div className={classes.title}>
                    <div className={classes.rating}>
                        <Rate
                            style={{ fontSize: '16px', height: '16px' }}
                            disabled={true}
                            value={feedbackContent.rating}
                            // eslint-disable-next-line react/no-unstable-nested-components
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
