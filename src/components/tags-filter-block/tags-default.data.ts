import { AllowedTrainResponseType } from '@redux/api/api-types';

export const defaultAllTrainingKey = 'all';

export const defaultTagsData: AllowedTrainResponseType[] = [
    {
        name: 'Все',
        key: defaultAllTrainingKey,
    },
];
