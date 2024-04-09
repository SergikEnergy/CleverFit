import { FC, useRef } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { AllInvitationsResponseType, PartnersResponseType } from '@redux/api/api-types';
import {
    useAcceptInvitationMutation,
    useRejectInvitationMutation,
} from '@redux/api/invitations-api';
import { addMyPartner, changeTrainingsMode } from '@redux/reducers/trainings-partners-slice';
import { updateInvitations } from '@redux/reducers/user-invitations-slice';
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
    const dispatch = useAppDispatch();
    const { from, createdAt, training } = user;
    const [acceptInvitation] = useAcceptInvitationMutation();
    const [rejectInvitation] = useRejectInvitationMutation();
    const date = moment(createdAt, dateFullStringFormat).format(dateFullFormatWithDot);
    const parentRef = useRef<HTMLDivElement>(null);

    const handleCancelTrainingClick = () => {
        dispatch(updateInvitations({ id: user.from._id }));
        rejectInvitation({ id: user.from._id });
    };

    const handleJoinTrainingClick = () => {
        dispatch(updateInvitations({ id: user.from._id }));
        acceptInvitation({ id: user.from._id, status: 'accepted' });
        const data: PartnersResponseType = {
            id: user.from._id,
            inviteId: user._id,
            name: `${user.from.lastName} ${user.from.firstName}`,
            trainingType: user.training.name,
            imageSrc: user.from.imageSrc,
            avgWeightInWeek: user.training.exercises.reduce((sum, elem) => {
                const newSum = sum + elem.weight / user.training.exercises.length;

                return Math.round(newSum);
            }, 0),
            status: 'accepted',
        };

        dispatch(addMyPartner(data));
        dispatch(changeTrainingsMode('partners'));
    };

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
                    onClick={handleJoinTrainingClick}
                >
                    Тренироваться вместе
                </Button>
                <Button
                    block={true}
                    onClick={handleCancelTrainingClick}
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
