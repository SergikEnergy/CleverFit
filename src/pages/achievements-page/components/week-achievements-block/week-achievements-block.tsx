import { FC } from 'react';
import { ChartColumn } from '@components/chart-column/chart-column';
import { TagsFilterBlock } from '@components/tags-filter-block';

import classes from './week-achievements-block.module.css';

export const WeekAchievementsBlock: FC = () => (
    <div className={classes.wrapper}>
        <TagsFilterBlock />
        <ChartColumn />
    </div>
);
