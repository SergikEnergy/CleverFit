import { ColorForTrain } from './constants/colors-for-train-badge';

export const getColorTrainByName = (trainName: string) => {
    switch (trainName.toLowerCase()) {
        case 'ноги':
            return ColorForTrain.legs;
        case 'руки':
            return ColorForTrain.hands;
        case 'силовая':
            return ColorForTrain.strength;
        case 'спина':
            return ColorForTrain.back;
        default:
            return ColorForTrain.chest;
    }
};
