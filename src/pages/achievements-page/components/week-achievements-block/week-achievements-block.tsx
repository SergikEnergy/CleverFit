import { FC } from 'react';
import { TagsFilterBlock } from '@components/tags-filter-block';

import classes from './week-achievements-block.module.css';

export const WeekAchievementsBlock: FC = () => (
    <div className={classes.wrapper}>
        <TagsFilterBlock />
    </div>
);
