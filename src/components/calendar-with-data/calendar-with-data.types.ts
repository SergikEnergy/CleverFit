import { AllowedTrainResponseType, TrainingsResponseType } from '@redux/api/api-types';

export type AllowedTrainsType = 'chest' | 'legs' | 'hands' | 'strength' | 'back';

type KeysCellType = 'id' | 'color' | 'content';

export type CellDataType = Record<KeysCellType, string>;

export type CalenDarWithDataPropsType = {
    dataForRender: TrainingsResponseType[] | [];
    allowedTrainsList: AllowedTrainResponseType[] | [];
};

export type ModalPositionType = {
    top: number;
    left: number;
    right: number;
    width: number;
    heightSelectedCell: number;
};
