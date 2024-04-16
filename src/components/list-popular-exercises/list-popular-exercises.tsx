import { FC } from 'react';
import { ExerciseDayListItem } from '@components/exercise-day-list-item';
import { useUserTrainingsSelector } from '@redux/selectors';
import { WEEK_DAYS } from '@utils/constants/week-days';
import { sortByDayLastWeekData } from '@utils/create-last-period-data';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';

import { getMoreOftenExerciseByDay } from './list-popular-exercises.utils';

import classes from './list-popular-exercises.module.css';

export const ListPopularExercises: FC = () => {
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();
    const lastWeekDays = sortByDayLastWeekData();

    const trainingsForList = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const listDifficulties = lastWeekDays.map((day, index) => ({
        key: `${day}`,
        difficulty: getMoreOftenExerciseByDay(trainingsForList, day),
        weekDay: WEEK_DAYS[index],
    }));

    return (
        <div className={classes.container}>
            <p className={classes.title}>Самые частые упражнения по&nbsp;дням&nbsp;недели</p>
            <div className={classes.list}>
                {listDifficulties.map((elem, index) => (
                    <ExerciseDayListItem
                        key={elem.key}
                        index={index + 1}
                        day={elem.weekDay}
                        data={elem.difficulty || undefined}
                        statusBadge='error'
                    />
                ))}
            </div>
        </div>
    );
};
