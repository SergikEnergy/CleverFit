import { CheckAllowedOrExistingTrainsType } from './CustomCalendarModal.types';

export const checkNarrowFramesDay = (day: number) => {
    if (day === 0 || day === 6 || day === 5) {
        return { side: 'right' };
    } else {
        return { side: 'left' };
    }
};

export const getAllowedTrains: CheckAllowedOrExistingTrainsType = (
    existingTrains,
    allowedTrains,
) => {
    const existingTrainNames = existingTrains.map((elem) => elem.name.toLowerCase());

    return allowedTrains.length > 0
        ? allowedTrains.filter((train) => !existingTrainNames.includes(train.name.toLowerCase()))
        : [];
};

export const getExistedNotImplementedTrains: CheckAllowedOrExistingTrainsType = (
    existingTrains,
    allowedTrains,
) => {
    const existingNotImplementedTrainNames = existingTrains.map((elem) => {
        if (!elem.isImplemented) {
            return elem.name.toLowerCase();
        }
    });

    return allowedTrains.length > 0
        ? allowedTrains.filter((train) =>
              existingNotImplementedTrainNames.includes(train.name.toLowerCase()),
          )
        : [];
};
