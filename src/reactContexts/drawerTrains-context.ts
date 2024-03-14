import { createContext } from 'react';
import { IAllowedTrainResponse, ITrainingsResponse, IExercise } from '@redux/API/api-types';
import { Moment } from 'moment';

export type ExercisesListType = Pick<ITrainingsResponse, 'exercises' | 'name'>;

export type DrawerTrainsContextType = {
    allowedTrains: IAllowedTrainResponse[];
    drawerTitle: string;
    setDrawerTitle: (title: string) => void;
    date: Moment | null;
    trainName: string;
    editedTrainID: string;
    editedTrainName: string;
    changeEditedTrainData: (id: string, train: string) => void;
    setTrainName: (train: string) => void;
    exercises: ExercisesListType[];
    resetExercises: () => void;
    isDrawerOpen: boolean;
    setExercises: (exercises: IExercise[], nameTrain: string) => void;
    openDrawer: () => void;
    closeDrawer: () => void;
    updateDate: (date: Moment) => void;
    updateAllowedTrains: (trains: IAllowedTrainResponse[]) => void;
};

const initialContext: DrawerTrainsContextType = {
    allowedTrains: [],
    editedTrainID: '',
    editedTrainName: '',
    date: null,
    drawerTitle: '',
    trainName: '',
    exercises: [],
    isDrawerOpen: false,
    changeEditedTrainData: (id, train) => {
        //
    },
    setDrawerTitle: (title) => {
        //
    },
    setExercises: (exercises, nameTrain) => {
        //
    },
    resetExercises: () => {
        //
    },
    setTrainName: (train) => {
        //
    },
    updateAllowedTrains: (trains) => {
        return;
    },
    openDrawer: () => {
        //
    },
    closeDrawer: () => {
        //
    },
    updateDate: (date) => {
        //
    },
};

export const DrawerTrainsContext = createContext<DrawerTrainsContextType>(initialContext);
