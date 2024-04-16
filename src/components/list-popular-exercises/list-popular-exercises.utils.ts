import { TrainingsResponseType } from '@redux/api/api-types';
import { getKeyWithMaxValueFromObject } from '@utils/get-key-from-max-value';
import { getStringFromDate } from '@utils/get-string-from-date';

export const getMoreOftenExerciseByDay = (trainings: TrainingsResponseType[], date: string) => {
    const filterTrainingsByDate = trainings.filter(
        (training) => getStringFromDate(training.date) === date,
    );

    if (filterTrainingsByDate.length === 0) return null;

    const allExercisesNames = trainings
        .map((elem) => elem.exercises.map((exercise) => exercise.name))
        .flat();

    const res: Record<string, number> = {};

    allExercisesNames.forEach((name) => {
        if (name in res) {
            res[name] += 1;
        } else {
            res[name] = 1;
        }
    });

    return getKeyWithMaxValueFromObject(res);
};
