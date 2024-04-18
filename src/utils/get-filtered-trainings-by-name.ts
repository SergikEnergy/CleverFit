import { defaultAllTrainingKey } from '@components/tags-filter-block/tags-default.data';
import { TrainingsResponseType } from '@redux/api/api-types';

export const getFilteredTrainingsByName = (
    trainings: TrainingsResponseType[],
    active: string,
    allowedList: Record<string, string>,
): TrainingsResponseType[] => {
    if (trainings.length === 0 || !allowedList) return [];

    return trainings.filter((training) => {
        if (!active || active === defaultAllTrainingKey) {
            return true;
        }
        if (active in allowedList)
            return training.name.toLowerCase() === allowedList[active].toLowerCase();

        return false;
    });
};
