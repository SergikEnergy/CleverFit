// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from '@jest/globals';
import { getKeyWithMaxValueFromObject } from '@utils/get-key-from-max-value';
import { QuantityTrainingsType } from '@utils/get-more-often-training';

describe('test get key of the property with maximum value - first in case same values', () => {
    const dummyObject1: QuantityTrainingsType = {
        first: 3,
        second: 4,
        third: 5,
        fourth: 6,
    };

    const dummyObject2: QuantityTrainingsType = {
        first: 3,
        second: 4,
        third: 4,
        fourth: 0,
    };

    const dummyObject3: QuantityTrainingsType = {
        first: -3,
        second: 0,
        third: 10,
        fourth: 0,
    };

    const dummyEmptyObject: QuantityTrainingsType = {};

    it('should return maximum from object - all positive numbers', () => {
        const keys = Object.keys(dummyObject1);
        const result = getKeyWithMaxValueFromObject(dummyObject1);

        expect(result).toEqual(keys.at(-1));
    });

    it('should return maximum from object - only first maximum value', () => {
        const keys = Object.keys(dummyObject2);
        const result = getKeyWithMaxValueFromObject(dummyObject2);

        expect(result).toEqual(keys[1]);
        expect(result).not.toBe(keys[2]);
    });

    it('should return maximum from object - positive and negative numbers', () => {
        const keys = Object.keys(dummyObject3);
        const result = getKeyWithMaxValueFromObject(dummyObject3);

        expect(result).toEqual(keys.at(-2));
    });

    it('should return empty string in case invalid empty object as a parameter', () => {
        const result = getKeyWithMaxValueFromObject(dummyEmptyObject);

        expect(result).toEqual('');
    });
});
