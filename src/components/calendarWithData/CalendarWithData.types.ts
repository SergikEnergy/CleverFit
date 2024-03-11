import { ITrainingsResponse, IAllowedTrainResponse } from '@redux/API/api-types';

export type AllowedTrainsType = 'chest' | 'legs' | 'hands' | 'strength' | 'back';

type keysCellType = 'id' | 'color' | 'content';

export type CellDataType = Record<keysCellType, string>;

export interface ICalenDarWithDataProps {
    dataForRender: ITrainingsResponse[] | [];
    allowedTrainsList: IAllowedTrainResponse[] | [];
}

export interface IModalPosition {
    top: number;
    left: number;
    right: number;
    width: number;
    heightSelectedCell: number;
}
