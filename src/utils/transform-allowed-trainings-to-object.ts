import { AllowedTrainResponseType } from '@redux/api/api-types';

export const transformAllowedTrainingsToObject = (list: AllowedTrainResponseType[]) => {
    const res: Record<string, string> = {};

    list.forEach((elem) => {
        if (!(elem.key in res)) res[elem.key] = elem.name.toLowerCase();
    });

    return res;
};
