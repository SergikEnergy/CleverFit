import { FC } from 'react';
import { useInvitationsSelector } from '@redux/selectors';
import { Badge } from 'antd';

export const TogetherTabTitle: FC = () => {
    const { userInvitations } = useInvitationsSelector();

    return (
        <Badge
            count={userInvitations.length}
            style={{ paddingLeft: 12, paddingRight: 12 }}
            offset={[18, 15]}
        >
            Совместные тренировки
        </Badge>
    );
};
