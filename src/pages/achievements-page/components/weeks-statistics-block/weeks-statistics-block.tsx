import { FC } from 'react';

import { CollapsedWeekStatistics } from '../collapsed-week-statistics';

import classes from './weeks-statistics-block.module.css';

export const WeeksStatisticsBlock: FC = () => {
    const weeksData = [
        { key: 'first week', weekIndex: 0 },
        { key: 'second week', weekIndex: 1 },
        { key: 'third week', weekIndex: 2 },
        { key: 'fourth week', weekIndex: 3 },
    ];

    return (
        <div className={classes.wrapper}>
            {weeksData.map((elem) => (
                <CollapsedWeekStatistics key={elem.key} indexWeek={elem.weekIndex} />
            ))}
        </div>
    );
};
