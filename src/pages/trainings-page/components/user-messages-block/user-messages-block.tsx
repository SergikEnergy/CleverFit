import { FC, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { UserMessagesCard } from '@components/user-message-card';
import { AllInvitationsResponseType } from '@redux/api/api-types';
import { useInvitationsSelector } from '@redux/selectors';
import { Button } from 'antd';

import classes from './user-messages-block.module.css';

export const UserMessagesBlock: FC = () => {
    const { userInvitations } = useInvitationsSelector();
    const [showAll, setShowAll] = useState(false);
    /* const userInvitations: AllInvitationsResponseType[] = [
        {
            _id: '6603fd9268b4b7f6e631d0bb',
            from: {
                _id: '65fb234f77536b7e4569acfe',
                firstName: 'Дмитрий',
                lastName: 'Шунто',
                imageSrc:
                    'https://lh3.googleusercontent.com/a/ACg8ocLeUQVWXkWBNDoFsw5K3vUdQsaw8Fv2gleepUNRJXPzyw=s96-c',
            },
            training: {
                _id: '14',
                name: 'Ноги',
                date: '2024-05-07T13:36:08.665Z',
                isImplementation: false,
                userId: '6603fd9268b4b7f6e631d0bb',
                parameters: {
                    repeat: true,
                    period: 4,
                    jointTraining: true,
                    participants: [],
                },
                exercises: [
                    {
                        _id: '1',
                        name: 'Присяд',
                        replays: 3,
                        weight: 50,
                        approaches: 10,
                        isImplementation: false,
                    },
                ],
            },
            status: 'pending',
            createdAt: '2024-04-14T13:36:08.665Z',
        },
        {
            _id: '6603fd9268b4b7f6e631d0bb',
            from: {
                _id: '65fb234f77536b7e4569acfe',
                firstName: 'Дмитрий',
                lastName: 'Шунто',
                imageSrc:
                    'https://lh3.googleusercontent.com/a/ACg8ocLeUQVWXkWBNDoFsw5K3vUdQsaw8Fv2gleepUNRJXPzyw=s96-c',
            },
            training: {
                _id: '14',
                name: 'Ноги',
                date: '2024-05-07T13:36:08.665Z',
                isImplementation: false,
                userId: '6603fd9268b4b7f6e631d0bb',
                parameters: {
                    repeat: true,
                    period: 4,
                    jointTraining: true,
                    participants: [],
                },
                exercises: [
                    {
                        _id: '1',
                        name: 'Присяд',
                        replays: 3,
                        weight: 50,
                        approaches: 10,
                        isImplementation: false,
                    },
                ],
            },
            status: 'pending',
            createdAt: '2024-04-14T13:36:08.665Z',
        },
    ];
    */

    const toggleShowed = () => setShowAll((prev) => !prev);

    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                Новое сообщение&nbsp;&nbsp;<span>{`(${userInvitations.length})`}</span>
            </div>
            <div className={classes.messages}>
                {userInvitations
                    .filter((_, index) => (showAll ? true : index === 0))
                    .map((user) => (
                        <UserMessagesCard key={user._id} user={user} />
                    ))}
            </div>
            <Button
                type='link'
                className={classes.link}
                onClick={toggleShowed}
                icon={showAll ? <UpOutlined /> : <DownOutlined />}
            >
                {showAll ? 'Скрыть все сообщения' : 'Показать все сообщения'}
            </Button>
        </div>
    );
};
