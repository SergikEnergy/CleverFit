import { TrainingsResponseType } from '@redux/api/api-types';
import { dateDayMonthFormat, dateFullStringFormat } from '@utils/constants/date-formats';
import moment from 'moment';

const DaysInMonth = 28;

export const getStringFromDate = (date: string | number): string => {
    if (typeof date === 'number') {
        return moment(date).format(dateDayMonthFormat);
    }

    return moment(date, dateFullStringFormat).format(dateDayMonthFormat);
};

export const createLastWeekData = (): string[] => {
    const firstDay = moment().subtract(6, 'days');
    const weekDays: string[] = [firstDay.format(dateDayMonthFormat)];

    for (let i = 1; i < 7; i++) {
        const day = firstDay.clone().add(i, 'days').format(dateDayMonthFormat);

        weekDays.push(day);
    }

    return weekDays;
};

export const createLastMonth = (): string[] => {
    const now = moment().subtract(7, 'days');
    const currentWeekDay = now.weekday();
    let firstDay = now.clone();

    if (currentWeekDay === 6) {
        firstDay = firstDay.subtract(DaysInMonth - 1, 'days');
    } else {
        firstDay = firstDay.add(6 - currentWeekDay, 'days').subtract(DaysInMonth - 1, 'days');
    }

    const monthDays = [firstDay.format(dateDayMonthFormat)];

    for (let i = 1; i < DaysInMonth; i++) {
        const day = firstDay.clone().add(i, 'days').format(dateDayMonthFormat);

        monthDays.push(day);
    }

    return monthDays;
};

export const getTrainingsDifficulty = (
    trainings: TrainingsResponseType[],
    date: string,
): number => {
    const filterTrainingsByDate = trainings.filter(
        (training) => getStringFromDate(training.date) === date,
    );

    console.log(filterTrainingsByDate);

    if (filterTrainingsByDate.length === 0) return 0;

    const difficulties = filterTrainingsByDate.map((elem) => {
        console.log(elem.exercises);
        const allSumExercises = elem.exercises.reduce(
            (acc, exercise) => acc + exercise.approaches * exercise.weight * exercise.replays,
            0,
        );
        console.log(allSumExercises, 'elem', elem);

        return Math.ceil(allSumExercises / elem.exercises.length);
    });

    return difficulties.reduce((acc, curr) => acc + curr, 0);
};
