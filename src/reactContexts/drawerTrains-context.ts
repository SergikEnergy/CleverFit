import { createContext } from 'react';
import { IAllowedTrainResponse } from '@redux/API/api-types';
import { Moment } from 'moment';

export type DrawerTrainsContextType = {
    allowedTrains: IAllowedTrainResponse[];
    date: Moment | null;
    exercise: string;
    isDrawerOpen: boolean;
    setExercise: (exercise: string) => void;
    openDrawer: () => void;
    closeDrawer: () => void;
    updateDate: (date: Moment) => void;
    updateAllowedTrains: (trains: IAllowedTrainResponse[]) => void;
};

const initialContext: DrawerTrainsContextType = {
    allowedTrains: [],
    date: null,
    exercise: '',
    isDrawerOpen: false,
    setExercise: (exercise: string) => {
        //
    },
    updateAllowedTrains: (trains: IAllowedTrainResponse[]) => {
        return;
    },
    openDrawer: () => {
        //
    },
    closeDrawer: () => {
        //
    },
    updateDate: (date: Moment) => {
        //
    },
};

export const DrawerTrainsContext = createContext<DrawerTrainsContextType>(initialContext);
