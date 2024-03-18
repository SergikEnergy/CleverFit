import { TrainingsResponseType, AllowedTrainResponseType } from '@redux/API/api-types';

export type AllowedTrainsType = 'chest' | 'legs' | 'hands' | 'strength' | 'back';

type keysCellType = 'id' | 'color' | 'content';

export type CellDataType = Record<keysCellType, string>;

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
