import { FC } from 'react';
import { useWindowWidth } from '@hooks/use-window-size';
import { Card } from 'antd';

import classes from './statistic-difficulty-card.module.css';

type StatisticDifficultyCardPropsType = {
    count: number;
    title: string;
};

export const StatisticDifficultyCard: FC<StatisticDifficultyCardPropsType> = ({ count, title }) => {
    const innerWindowWidth = useWindowWidth();

    return (
        <Card
            style={{
                width: innerWindowWidth > 500 ? 156 : 328,
                height: innerWindowWidth > 500 ? 140 : 64,
            }}
            className={classes.card}
        >
            <div className={classes.count}>{count.toLocaleString('ru-RU')}</div>
            <div className={classes.title}>{title}</div>
        </Card>
    );
};
