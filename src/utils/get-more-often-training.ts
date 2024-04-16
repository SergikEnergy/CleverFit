import { TrainingsResponseType } from '@redux/api/api-types';

import { dummyAllowedTrainings } from './constants/allowed-trainings';
import { getKeyWithMaxValueFromObject } from './get-key-from-max-value';

export type QuantityTrainingsType = Record<string, number>;

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
