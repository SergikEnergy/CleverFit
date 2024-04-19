// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from '@jest/globals';
import { TrainingsResponseType } from '@redux/api/api-types';

import { getFilteredTrainingsByName } from '../utils/get-filtered-trainings-by-name';

export const userDummyTraining: TrainingsResponseType[] = [
    {
        _id: '1',
        name: 'Ноги',
        date: '2024-04-19T00:42:12.532Z',
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            period: 6,
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 3,
                weight: 10,
                approaches: 10,
            },
            {
                _id: '2',
                name: 'Толкание нагрузки',
                replays: 3,
                weight: 10,
                approaches: 10,
            },
        ],
    },
    {
        _id: '2',
        name: 'Руки',
        date: '2024-04-18T00:42:12.532Z',
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            repeat: false,
        },
        exercises: [
            {
                _id: '2',
                name: 'Присяд',
                replays: 1,
                weight: 2,
                approaches: 3,
            },
        ],
    },
    {
        _id: '3',
        name: 'Силовая',
        date: '2024-04-18T00:42:12.532Z',
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Жим',
                replays: 1,
                weight: 1,
                approaches: 3,
            },
        ],
    },
    {
        _id: '4',
        name: 'Спина',
        date: '2024-04-20T00:42:12.532Z',
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: '5',
        name: 'Спина',
        date: '2024-04-21T00:42:12.532Z',
        isImplementation: false,
        userId: '65b809899adc9e39e3660ae0',
        parameters: {
            jointTraining: false,
            participants: [],
            repeat: false,
        },
        exercises: [
            {
                _id: '1',
                name: 'Присяд',
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
];

describe('filter data by name', () => {
    const dummyAllowedTrainings: Record<string, string> = {
        legs: 'ноги',
        hands: 'руки',
        strength: 'силовая',
        back: 'спина',
        chest: 'грудь',
    };

    it('should return empty array without trainings', () => {
        const data = getFilteredTrainingsByName([], 'all', dummyAllowedTrainings);

        expect(data).toHaveLength(0);
    });

    it('should return hands in case hands key', () => {
        const key = 'hands';
        const data = getFilteredTrainingsByName(userDummyTraining, key, dummyAllowedTrainings);

        expect(data).toHaveLength(1);
        expect(data[0].name.toLowerCase()).toEqual(dummyAllowedTrainings[key]);
    });

    it('should return legs in case legs key', () => {
        const key = 'legs';
        const data = getFilteredTrainingsByName(userDummyTraining, key, dummyAllowedTrainings);

        expect(data).toHaveLength(1);
        expect(data[0].name.toLowerCase()).toEqual(dummyAllowedTrainings[key]);
    });

    it('should return all in case not key', () => {
        const key = '';
        const data = getFilteredTrainingsByName(userDummyTraining, key, dummyAllowedTrainings);
        const lengthDummyTrainings = userDummyTraining.length;

        expect(data).toHaveLength(lengthDummyTrainings);
    });
});
