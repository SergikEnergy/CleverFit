import { FC } from 'react';
import { Badge, BadgeProps } from 'antd';

import classes from './exercise-day-list-item.module.css';

type ExerciseDayListItemPropsType = {
    index: number;
    day: string;
    data?: number | string;
    statusBadge?: BadgeProps['status'];
};

export const ExerciseDayListItem: FC<ExerciseDayListItemPropsType> = ({
    index,
    day,
    data,
    statusBadge,
}) => (
    <div className={classes.item}>
        <Badge
            status={statusBadge || undefined}
            className={classes.badge}
            count={index}
            style={
                typeof data === 'number'
                    ? {
                          color: data ? '#fff' : '#2F54EB',
                          backgroundColor: data ? '#2F54EB' : '#F0F5FF',
                      }
                    : undefined
            }
        />
        <span className={classes.day}>{day}</span>
        {!!data && typeof data === 'number' && (
            <span className={classes.data}>{`${data}\u00A0кг`}</span>
        )}
        {!!data && typeof data === 'string' && <span className={classes.data}>{data}</span>}
    </div>
);
