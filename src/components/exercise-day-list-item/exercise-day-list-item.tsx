import { FC } from 'react';
import { Badge } from 'antd';

import classes from './exercise-day-list-item.module.css';

type ExerciseDayListItemPropsType = {
    index: number;
    day: string;
    weight?: number;
};

export const ExerciseDayListItem: FC<ExerciseDayListItemPropsType> = ({ index, day, weight }) => (
    <div className={classes.item}>
        <Badge
            className={classes.badge}
            count={index}
            style={{
                color: weight ? '#fff' : '#2F54EB',
                backgroundColor: weight ? '#2F54EB' : '#F0F5FF',
            }}
        />
        <span className={classes.day}>{day}</span>
        {!!weight && <span className={classes.weight}>{`${weight}\u00A0кг`}</span>}
    </div>
);
