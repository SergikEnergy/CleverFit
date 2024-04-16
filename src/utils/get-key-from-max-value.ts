import { QuantityTrainingsType } from './get-more-often-training';

export const getKeyWithMaxValueFromObject = (sourceObject: QuantityTrainingsType) => {
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
