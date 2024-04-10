import { createContext } from 'react';

export type EditOrCreateModeType = 'edit' | 'create' | 'add' | 'join';
export type StatusSubmitType = 'success' | 'error';

export type TrainingsDrawerContextType = {
    open: boolean;
    activeTrainingId: string;
    activePartnerTrainingId: string;
    changeActivePartnerTrainingId: (id: string) => void;
    changeActiveTrainingId: (id: string) => void;
    openDrawer: () => void;
    closeDrawer: () => void;
    modeDrawer: EditOrCreateModeType;
    statusSubmit: StatusSubmitType;
    changeStatus: (status: StatusSubmitType) => void;
    changeMode: (mode: EditOrCreateModeType) => void;
};

export const TrainingsDrawerContext = createContext<TrainingsDrawerContextType>({
    open: false,
    activeTrainingId: '',
    activePartnerTrainingId: '',
    changeActivePartnerTrainingId: () => {},
    modeDrawer: 'create',
    statusSubmit: 'error',
    changeActiveTrainingId: () => {},
    changeMode: () => {},
    changeStatus: () => {},
    openDrawer: () => {},
    closeDrawer: () => {},
});
