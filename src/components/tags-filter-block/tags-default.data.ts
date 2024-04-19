import { AllowedTrainResponseType } from '@redux/api/api-types';
import { defaultAllTrainingKey } from '@redux/reducers/trainings-slice';

export const defaultTagsData: AllowedTrainResponseType[] = [
    {
        name: 'Все',
        key: defaultAllTrainingKey,
    },
];
