import { ModalPositionType } from '@components/calendar-with-data/calendar-with-data.types';
import { AllowedTrainResponseType, TrainingsResponseType } from '@redux/api/api-types';
import { Moment } from 'moment';

type TrainsNameImplementedType = { name: string; isImplemented: boolean };

export type CheckAllowedOrExistingTrainsType = (
    existingTrains: TrainsNameImplementedType[],
    allowedTrains: AllowedTrainResponseType[],
) => AllowedTrainResponseType[];

export type ModalModeType = 'train' | 'exercise';

export type CustomCalendarModalPropsType = {
    widthModal: string;
    modalType: ModalModeType;
    modalPosition: ModalPositionType;
    value: Moment;
    trains: [] | TrainingsResponseType[];
    isModalVisible: boolean;
    closeModal: () => void;
    changeModalType: () => void;
    isCentered?: boolean;
};
