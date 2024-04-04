import { FC, ReactNode, useMemo, useState } from 'react';

import {
    EditOrCreateModeType,
    StatusSubmitType,
    TrainingsDrawerContext,
} from './trainings-drawer-context';

export const TrainingsDrawerContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modeDrawer, setModeDrawer] = useState<EditOrCreateModeType>('create');
    const [statusAnswer, setStatusAnswer] = useState<StatusSubmitType>('error');
    const [activeTrainingId, setActiveTrainingId] = useState('');

    const openDrawer = () => {
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    const changeMode = (mode: EditOrCreateModeType) => setModeDrawer(mode);

    const changeActiveTrainingId = (id: string) => setActiveTrainingId(id);

    const changeStatus = (status: StatusSubmitType) => setStatusAnswer(status);

    const value = useMemo(
        () => ({
            open: isOpen,
            openDrawer,
            closeDrawer,
            modeDrawer,
            activeTrainingId,
            changeActiveTrainingId,
            changeMode,
            changeStatus,
            statusSubmit: statusAnswer,
        }),
        [activeTrainingId, isOpen, modeDrawer, statusAnswer],
    );

    return (
        <TrainingsDrawerContext.Provider value={value}>{children}</TrainingsDrawerContext.Provider>
    );
};
