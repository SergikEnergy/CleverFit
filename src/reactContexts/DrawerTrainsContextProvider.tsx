import { FC, useState, ReactNode } from 'react';
import { DrawerTrainsContext } from './drawerTrains-context';
import { IAllowedTrainResponse } from '@redux/API/api-types';
import { Moment } from 'moment';

export const DrawerTrainsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [allowedTrains, setAllowedTrains] = useState<IAllowedTrainResponse[]>([]);
    const [date, setDate] = useState<Moment | null>(null);
    const [exerciseLine, setExerciseLine] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const updateAllowedTrains = (trains: IAllowedTrainResponse[]) => {
        setAllowedTrains(trains);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const openDrawer = () => {
        setIsDrawerOpen(false);
    };

    const setExercise = (exercise: string) => {
        setExerciseLine(exercise);
    };

    const updateDate = (date: Moment) => {
        setDate(date);
    };

    return (
        <DrawerTrainsContext.Provider
            value={{
                date,
                updateDate,
                closeDrawer,
                openDrawer,
                setExercise,
                exercise: exerciseLine,
                allowedTrains,
                isDrawerOpen,
                updateAllowedTrains,
            }}
        >
            {children}
        </DrawerTrainsContext.Provider>
    );
};
