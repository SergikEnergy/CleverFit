import { TrainingsResponseType } from '@redux/api/api-types';
import { getStringFromDate } from '@utils/get-string-from-date';

export const getTrainingsDifficulty = (
    trainings: TrainingsResponseType[],
    date: string,
): number => {
    const filterTrainingsByDate = trainings.filter(
        (training) => getStringFromDate(training.date) === date,
    );

    if (filterTrainingsByDate.length === 0) return 0;

    const difficulties = filterTrainingsByDate.map((elem) => {
        const allSumExercises = elem.exercises.reduce((acc, exercise) => {
            let sum = acc;

            const approaches =
                !exercise.approaches && exercise.approaches !== 0 ? 1 : exercise.approaches;
            const weight = exercise.weight ? exercise.weight : 0;
            const replays = exercise.replays ? exercise.replays : 0;

            sum += approaches * weight * replays;

            return sum;
        }, 0);

        return Math.ceil(allSumExercises / elem.exercises.length);
    });

    return difficulties.reduce((acc, curr) => acc + curr, 0);
};
