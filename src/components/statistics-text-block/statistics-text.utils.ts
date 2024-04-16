import { TrainingsResponseType } from '@redux/api/api-types';
import { getKeyWithMaxValueFromObject } from '@utils/get-key-from-max-value';
import { QuantityTrainingsType } from '@utils/get-more-often-training';

export const getMoreOftenExercise = (trainings: TrainingsResponseType[]) => {
    const exercisesQuantity: QuantityTrainingsType = trainings.reduce((acc, curr) => {
        const namesExercises = curr.exercises.map((elem) => elem.name);

        const temp: QuantityTrainingsType = acc;

        for (let i = 0; i < namesExercises.length; i++) {
            if (namesExercises[i] in temp) {
                temp[namesExercises[i]] += 1;
            } else {
                temp[namesExercises[i]] = 1;
            }
        }

        return temp;
    }, {});

    return getKeyWithMaxValueFromObject(exercisesQuantity);
};
