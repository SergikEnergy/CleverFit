// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from '@jest/globals';
import { getMoreOftenTraining } from '@utils/get-more-often-training';

import { userDummyTraining } from './get-filtered-trainings-by-name.test';

const dummyAllowedTrainings: Record<string, string> = {
    legs: 'ноги',
    hands: 'руки',
    strength: 'силовая',
    back: 'спина',
    chest: 'грудь',
};
const keys = Object.keys(dummyAllowedTrainings);

describe('check more often training selection', () => {
    it('should return correct value', () => {
        const data = getMoreOftenTraining(userDummyTraining, dummyAllowedTrainings);
        const expectedKeyFromDummyData = keys[3];

        expect(data).not.toBeNull();
        expect(data).toBe(expectedKeyFromDummyData);
    });

    it('should return empty string in case incorrect empty trainings', () => {
        const data = getMoreOftenTraining([], dummyAllowedTrainings);
        const notExpectedKeyFromDummyData = keys[3];
        const expectedEmptyKeyFromDummyData = '';

        expect(data).toBe(expectedEmptyKeyFromDummyData);
        expect(data).not.toBe(notExpectedKeyFromDummyData);
    });
});
