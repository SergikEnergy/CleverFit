import { FC, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { UserMessagesCard } from '@components/user-message-card';
import { useInvitationsSelector } from '@redux/selectors';
import { Button } from 'antd';

import classes from './user-messages-block.module.css';

export const UserMessagesBlock: FC = () => {
    const { userInvitations } = useInvitationsSelector();
    const [showAll, setShowAll] = useState(false);
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
