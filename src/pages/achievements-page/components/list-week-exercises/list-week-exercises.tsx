import { FC } from 'react';
import { getTrainingsDifficulty } from '@components/chart-column/chart-column.utils';
import { ExerciseDayListItem } from '@components/exercise-day-list-item/exercise-day-list-item';
import { useUserTrainingsSelector } from '@redux/selectors';
import { WEEK_DAYS } from '@utils/constants/week-days';
import { sortByDayLastWeekData } from '@utils/create-last-period-data';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';

import classes from './list-week-exercises.module.css';

export const ListWeekExercises: FC = () => {
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();
    const lastWeekDays = sortByDayLastWeekData();

    const trainingsForList = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const listDifficulties = lastWeekDays.map((day, index) => ({
        key: `${day}`,
        difficulty: getTrainingsDifficulty(trainingsForList, day),
        weekDay: WEEK_DAYS[index],
    }));

    return (
        <div className={classes.container}>
            <p className={classes.title}>Средняя нагрузка по&nbsp;дням&nbsp;недели</p>
            <div className={classes.list}>
                {listDifficulties.map((elem, index) => (
                    <ExerciseDayListItem
                        key={elem.key}
                        index={index + 1}
                        day={elem.weekDay}
                        weight={elem.difficulty}
                    />
                ))}
            </div>
        </div>
    );
};
