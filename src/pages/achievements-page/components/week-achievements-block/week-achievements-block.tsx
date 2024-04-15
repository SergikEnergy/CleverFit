import { FC } from 'react';
import { ChartColumn } from '@components/chart-column/chart-column';
import { StatisticsTextBlock } from '@components/statistics-text-block';
import { TagsFilterBlock } from '@components/tags-filter-block';

import { ListWeekExercises } from '../list-week-exercises';
import { StatisticsCardsBlock } from '../statistics-cards-block';

import classes from './week-achievements-block.module.css';

export const WeekAchievementsBlock: FC = () => (
    <div className={classes.wrapper}>
        <TagsFilterBlock />
        <div className={classes.chart_list}>
            <ChartColumn />
            <ListWeekExercises />
        </div>
        <StatisticsCardsBlock />
        <StatisticsTextBlock />
    </div>
);
