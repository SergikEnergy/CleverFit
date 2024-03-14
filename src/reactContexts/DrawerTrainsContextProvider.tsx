import { FC, useState, ReactNode } from 'react';
import { DrawerTrainsContext } from './drawerTrains-context';
import { IAllowedTrainResponse, IExercise } from '@redux/API/api-types';
import { ExercisesListType } from './drawerTrains-context';
import { Moment } from 'moment';

export const DrawerTrainsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [allowedTrains, setAllowedTrains] = useState<IAllowedTrainResponse[]>([]);
    const [date, setDate] = useState<Moment | null>(null);
    const [train, setTrain] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerHeader, setDrawerHeader] = useState('');
    const [exercisesList, setExercisesList] = useState<ExercisesListType[]>([]);
    const [trainForEdit, setTrainForEdit] = useState('');

    const updateAllowedTrains = (trains: IAllowedTrainResponse[]) => {
        setAllowedTrains(trains);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const openDrawer = () => {
        setIsDrawerOpen(true);
    };

    const setTrainName = (train: string) => {
        setTrain(train);
    };

    const setExercises = (list: IExercise[], nameTrain: string) => {
        setExercisesList((prev) => {
            let isSameElement = false;
            const updatedList = prev.map((elem) => {
                if (elem.name === nameTrain) {
                    isSameElement = true;
                    return { exercises: list, name: nameTrain };
                } else {
                    return elem;
                }
            });
            if (!isSameElement) {
                updatedList.push({ exercises: list, name: nameTrain });
            }
            return updatedList;
        });
    };

    const resetExercises = () => {
        setExercisesList([]);
    };

    const updateDate = (date: Moment) => {
        setDate(date);
    };

    const setDrawerTitle = (title: string) => {
        setDrawerHeader(title);
    };

    const changeEditedTrain = (train: string) => {
        setTrainForEdit(train);
    };

    return (
        <DrawerTrainsContext.Provider
            value={{
                editedTrain: trainForEdit,
                changeEditedTrain,
                date,
                trainName: train,
                setTrainName,
                exercises: exercisesList,
                setExercises,
                drawerTitle: drawerHeader,
                setDrawerTitle,
                updateDate,
                closeDrawer,
                openDrawer,
                allowedTrains,
                isDrawerOpen,
                updateAllowedTrains,
                resetExercises,
            }}
        >
            {children}
        </DrawerTrainsContext.Provider>
    );
};
