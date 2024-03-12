import { FC } from 'react';
import { ITrainingsResponse } from '@redux/API/api-types';
import { Badge } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getColorTrainByName } from '@components/calendarWithData/CalendarWithData.utils';

import classes from './TrainWithBadge.module.css';

interface TrainWithBadgeProps {
    train: ITrainingsResponse;
}

export const TrainWithBadge: FC<TrainWithBadgeProps> = ({ train }) => (
    <li className={classes.train}>
        <Badge
            className={classes.badge}
            color={getColorTrainByName(train.name)}
            text={train.name}
        />
        <EditOutlined style={{ color: 'blue' }} className={classes.highlighter} />
    </li>
);
