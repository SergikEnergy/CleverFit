import { ModalPositionType } from '@components/calendar-with-data/calendar-with-data.types';
import { AllowedTrainResponseType, TrainingsResponseType } from '@redux/api/api-types';
import { TrainOrExerciseModeType } from '@utils/constants/train-modes';
import { Moment } from 'moment';

type TrainsNameImplementedType = { name: string; isImplemented: boolean | undefined };

export type CheckAllowedOrExistingTrainsType = (
    existingTrains: TrainsNameImplementedType[],
    allowedTrains: AllowedTrainResponseType[],
) => AllowedTrainResponseType[];

export type CustomCalendarModalPropsType = {
    widthModal: string;
    modalType: TrainOrExerciseModeType;
    modalPosition: ModalPositionType;
    value: Moment;
    trains: [] | TrainingsResponseType[];
    isModalVisible: boolean;
    closeModal: () => void;
    changeModalType: () => void;
    isCentered?: boolean;
};
