import { FC, useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AllInvitationsResponseType } from '@redux/api/api-types';
import { dateFullFormatWithDot, dateFullStringFormat } from '@utils/constants/date-formats';
import { Avatar, Button } from 'antd';
import classnames from 'classnames';
import moment from 'moment';

import { UserMessagePopover } from './components';

import classes from './user-message-card.module.css';

type UserMessagesCardPropsType = {
    user: AllInvitationsResponseType;
};

export const UserMessagesCard: FC<UserMessagesCardPropsType> = ({ user }) => {
    const { from, createdAt, training } = user;
    const date = moment(createdAt, dateFullStringFormat).format(dateFullFormatWithDot);
    const parentRef = useRef<HTMLDivElement>(null);

    return (
        <div className={classes.card}>
            <div className={classes.title}>
                <div className={classes.avatar}>
                    {from.imageSrc ? (
                        <Avatar src={from.imageSrc} />
                    ) : (
                        <UserOutlined style={{ fontSize: 32 }} />
                    )}
                </div>
                <div className={classes.name}>
                    <div>{from.firstName}</div>
                    <div>{from.lastName}</div>
                </div>
            </div>
            <div className={classes.info}>
                <div className={classes.date}>{date}</div>
                <div className={classes.description}>
                    {`Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь
                    присоединиться ко мне на следующих тренировках?`}
                </div>

                <div ref={parentRef}>
                    <UserMessagePopover parentRef={parentRef} training={training} />
                </div>
            </div>
            <div className={classes.actions}>
                <Button
                    block={true}
                    className={classnames(classes.button, classes.primary)}
                    type='primary'
                    size='large'
                    style={{ backgroundColor: '#2F54EB', border: 'none' }}
                >
                    Тренироваться вместе
                </Button>
                <Button
                    block={true}
                    type='ghost'
                    size='large'
                    className={classnames(classes.button, classes.bordered)}
                >
                    Отклонить запрос
                </Button>
            </div>
        </div>
    );
};
