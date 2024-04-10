import { FC, ReactNode, useMemo, useState } from 'react';
import { AllowedTrainResponseType, ExerciseType } from '@redux/api/api-types';
import { Moment } from 'moment';

import { DrawerTrainsContext, ExercisesListType } from './drawer-trains-context';

export const DrawerTrainsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [allowedTrains, setAllowedTrains] = useState<AllowedTrainResponseType[]>([]);
    const [date, setDate] = useState<Moment | null>(null);
    const [train, setTrain] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerHeader, setDrawerHeader] = useState('');
    const [exercisesList, setExercisesList] = useState<ExercisesListType[]>([]);
    const [trainForEditID, setTrainForEditID] = useState('');
    const [trainForEditName, setTrainForEditName] = useState('');

    const updateAllowedTrains = (trains: AllowedTrainResponseType[]) => setAllowedTrains(trains);

    const closeDrawer = () => setIsDrawerOpen(false);

    const openDrawer = () => setIsDrawerOpen(true);

    const setTrainName = (newTrain: string) => setTrain(newTrain);

    const setExercises = (list: ExerciseType[], nameTrain: string) => {
        setExercisesList((prev) => {
            let isSameElement = false;
            const updatedList = prev.map((elem) => {
                if (elem.name === nameTrain) {
                    isSameElement = true;

                    return { exercises: list, name: nameTrain };
                }

                return elem;
            });

            if (!isSameElement) {
                updatedList.push({ exercises: list, name: nameTrain });
            }

            return updatedList;
        });
    };

    const resetExercises = () => setExercisesList([]);

    const updateDate = (newDate: Moment) => setDate(newDate);

    const setDrawerTitle = (title: string) => setDrawerHeader(title);

    const changeEditedTrainData = (id: string, newTrain: string) => {
        setTrainForEditID(id);
        setTrainForEditName(newTrain);
    };

    const value = useMemo(
        () => ({
            editedTrainID: trainForEditID,
            editedTrainName: trainForEditName,
            changeEditedTrainData,
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
        }),
        [
            allowedTrains,
            date,
            drawerHeader,
            exercisesList,
            isDrawerOpen,
            train,
            trainForEditID,
            trainForEditName,
        ],
    );

    return <DrawerTrainsContext.Provider value={value}>{children}</DrawerTrainsContext.Provider>;
};
