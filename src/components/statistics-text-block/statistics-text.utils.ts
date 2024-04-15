import { TrainingsResponseType } from '@redux/api/api-types';
import { dummyAllowedTrainings } from '@utils/constants/allowed-trainings';

type QuantityTrainingsType = Record<string, number>;

const getKeyWithMaxValueFromObject = (sourceObject: QuantityTrainingsType) => {
    let maxValue = 0;
    let foundedKey = '';
    const pairsResult = Object.entries(sourceObject);

    for (let i = 0; i < pairsResult.length; i++) {
        const [key, value] = pairsResult[i];

        if (value > maxValue) {
            maxValue = value;
            foundedKey = key;
        }
    }

    return foundedKey;
};

export const getMoreOftenTraining = (trainings: TrainingsResponseType[]) => {
    const entries = Object.entries(dummyAllowedTrainings);

    const trainingsQuantity: QuantityTrainingsType = trainings.reduce((acc, curr) => {
        const temp: QuantityTrainingsType = acc;
        const foundedPair = entries.find(
            (elem) => elem[1].toLowerCase() === curr.name.toLowerCase(),
        );

        if (foundedPair) {
            const [allowedKey] = foundedPair;

            if (allowedKey in temp) {
                temp[allowedKey] += 1;
            } else {
                temp[allowedKey] = 1;
            }
        }

        return temp;
    }, {});

    return getKeyWithMaxValueFromObject(trainingsQuantity);
};

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
