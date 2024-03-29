import { MouseEvent } from 'react';
import { TrainingsResponseType } from '@redux/api/api-types';
import { TrainOrExerciseModeType } from '@utils/constants/train-modes';
import { Moment } from 'moment';

import { ModalPositionType } from '../calendar-with-data.types';

export type DataForCellsPropsType = {
    date: Moment;
    dataForRender: TrainingsResponseType[] | [];
    isFullScreen: boolean;
    hideCollapsed: () => void;
    resetExercises: () => void;
    setModalType: (mode: TrainOrExerciseModeType) => void;
    changeEditedTrainData: (id: string, train: string) => void;
    setIsModalVisible: (state: boolean) => void;
    setSelectedDay: (day: Moment) => void;
    selectedDay: Moment;
    setSelectedCellData: (data: TrainingsResponseType[] | []) => void;
    setModalPosition: (position: ModalPositionType) => void;
};

export type VoidFuncType = () => void;

export type HandleDateClickFuncType = (
    currentData: TrainingsResponseType[] | [],
    event: MouseEvent<HTMLDivElement>,
    isFullScreen: boolean,
    hideCollapsed: VoidFuncType,
    resetExercises: VoidFuncType,
    setModalType: (mode: TrainOrExerciseModeType) => void,
    changeEditedTrainData: (id: string, train: string) => void,
    setIsModalVisible: (state: boolean) => void,
    setSelectedDay: (day: Moment) => void,
    selectedDay: Moment,
    setSelectedCellData: (data: TrainingsResponseType[] | []) => void,
    setModalPosition: (position: ModalPositionType) => void,
) => void;
