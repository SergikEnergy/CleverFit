import { AllowedTrainResponseType } from '@redux/API/api-types';
import { Moment } from 'moment';
import { ModalPositionType } from '@components/calendarWithData/CalendarWithData.types';
import { TrainingsResponseType } from '@redux/API/api-types';

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
