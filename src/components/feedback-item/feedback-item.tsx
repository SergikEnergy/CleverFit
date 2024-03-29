import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { CustomAvatar } from '@components/custom-avatar';
import { FeedbackResponseType } from '@redux/api/api-types';
import { Rate } from 'antd';

import { getStarRateIcon } from '../../helpers/get-star-rate-icon';

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
                            character={({ index }) =>
                                getStarRateIcon({ value: index }, feedbackContent.rating)
                            }
                        />
                    </div>
                    <div className={classes.date}>{dateFormatted}</div>
                </div>
                <div className={classes.comment}>{feedbackContent.message}</div>
            </div>
        </div>
    );
};
