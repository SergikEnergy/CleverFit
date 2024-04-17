import { FC, useEffect, useRef, useState } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { getTrainingsDifficulty } from '@components/chart-column/chart-column.utils';
import { ExerciseDayListItem } from '@components/exercise-day-list-item';
import { useWindowWidth } from '@hooks/use-window-size';
import { useUserTrainingsSelector } from '@redux/selectors';
import { WEEK_DAYS } from '@utils/constants/week-days';
import { createLastMonth } from '@utils/create-last-period-data';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';
import { Button } from 'antd';

import classes from './collapsed-week-statistics.module.css';

type CollapsedWeekStatisticsPropsType = {
    indexWeek: number;
};

const DAY_IN_WEEK = 7;

export const CollapsedWeekStatistics: FC<CollapsedWeekStatisticsPropsType> = ({ indexWeek }) => {
    const innerWindowWidth = useWindowWidth();
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();
    const firstChanging = useRef(true);
    const isMobileWidth = innerWindowWidth < 550;
    const [isCollapsed, setIsCollapsed] = useState(isMobileWidth);
    const lastMontData = createLastMonth();
    const indexedWeekData = lastMontData.slice(
        indexWeek * DAY_IN_WEEK,
        indexWeek * DAY_IN_WEEK + DAY_IN_WEEK,
    );
    const [firstWeekDay, finalWeekDay] = [
        indexedWeekData[0],
        indexedWeekData[indexedWeekData.length - 1],
    ];

    const trainingsForList = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const listDifficulties = indexedWeekData.map((day, index) => ({
        key: `${day}`,
        difficulty: getTrainingsDifficulty(trainingsForList, day),
        weekDay: WEEK_DAYS[index],
    }));

    useEffect(() => {
        if (isMobileWidth && firstChanging.current) {
            setIsCollapsed(true);
            firstChanging.current = false;
        }
        if (!isMobileWidth) setIsCollapsed(false);
    }, [isMobileWidth]);

    const toggleCollapsed = () => setIsCollapsed((prev) => !prev);

    return (
        <div className={classes.container}>
            <div className={classes.collapsed}>
                <div className={classes.title}>{`Неделя ${firstWeekDay}-${finalWeekDay}`}</div>
                {isMobileWidth && (
                    <Button
                        onClick={toggleCollapsed}
                        icon={
                            <UpOutlined
                                style={{
                                    color: '#000000',
                                    fontSize: 14,
                                    transition: 'all easy-in 0.3s',
                                    transform: `${isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                                }}
                            />
                        }
                        type='text'
                        className={classes.close}
                    />
                )}
            </div>

            {!isCollapsed && (
                <div className={classes.list}>
                    {listDifficulties.map((elem, index) => (
                        <ExerciseDayListItem
                            key={elem.key}
                            index={index + 1}
                            day={elem.weekDay}
                            data={elem.difficulty}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
