import { FC } from 'react';
import { Card } from 'antd';

import classes from './statistic-difficulty-card.module.css';

type StatisticDifficultyCardPropsType = {
    count: number;
    title: string;
};

export const StatisticDifficultyCard: FC<StatisticDifficultyCardPropsType> = ({ count, title }) => (
    <Card style={{ width: 156, height: 140 }} className={classes.card}>
        <div className={classes.count}>{count}</div>
        <div className={classes.title}>{title}</div>
    </Card>
);
