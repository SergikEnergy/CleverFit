import { defaultAllTrainingKey } from '@components/tags-filter-block/tags-default.data';
import { TrainingsResponseType } from '@redux/api/api-types';

import { dummyAllowedTrainings } from './constants/allowed-trainings';

export const getFilteredTrainingsByName = (
    trainings: TrainingsResponseType[],
    active: string,
): TrainingsResponseType[] =>
    trainings.filter((training) => {
        if (!active || active === defaultAllTrainingKey) {
            return true;
        }

        return training.name.toLowerCase() === dummyAllowedTrainings[active].toLowerCase();
    });
