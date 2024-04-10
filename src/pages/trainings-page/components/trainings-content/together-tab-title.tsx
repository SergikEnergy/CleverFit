import { FC } from 'react';
import { useWindowWidth } from '@hooks/use-window-size';
import { useInvitationsSelector } from '@redux/selectors';
import { Badge } from 'antd';

export const TogetherTabTitle: FC = () => {
    const { userInvitations } = useInvitationsSelector();
    const innerWindowWidth = useWindowWidth();

    return (
        <Badge
            count={userInvitations.length}
            style={{ paddingLeft: 12, paddingRight: 12 }}
            offset={innerWindowWidth > 1000 ? [18, 15] : [15, 10]}
        >
            Совместные тренировки
        </Badge>
    );
};
