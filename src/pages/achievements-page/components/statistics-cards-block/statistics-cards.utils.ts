import { TrainingsResponseType } from '@redux/api/api-types';

export const getSummaryDifficulty = (trainings: TrainingsResponseType[]): number => {
    if (trainings.length === 0) return 0;

    const difficulties = trainings.map((elem) => {
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

export const getReplays = (trainings: TrainingsResponseType[]): number => {
    const data = trainings.map((elem) => ({
        replays: elem.exercises.reduce((acc, curr) => (curr.replays ? acc + curr.replays : acc), 0),
    }));

    return Math.ceil(data.reduce((acc, curr) => acc + curr.replays, 0));
};
