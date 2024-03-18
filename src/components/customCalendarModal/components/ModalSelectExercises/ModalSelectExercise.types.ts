import { AllowedTrainResponseType, TrainingsResponseType } from '@redux/API/api-types';
import { Moment } from 'moment';

export type ModalSelectExercisePropsType = {
    changeMode: () => void;
    allowedTrains: AllowedTrainResponseType[];
    existingTrains: AllowedTrainResponseType[];
    trains: [] | TrainingsResponseType[];
    date: Moment;
    trainForEdit: string;
    closeModal: () => void;
};
