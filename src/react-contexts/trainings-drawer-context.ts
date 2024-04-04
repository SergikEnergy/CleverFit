import { createContext } from 'react';

export type EditOrCreateModeType = 'edit' | 'create' | 'add';
export type StatusSubmitType = 'success' | 'error';

export type TrainingsDrawerContextType = {
    open: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    modeDrawer: EditOrCreateModeType;
    statusSubmit: StatusSubmitType;
    changeStatus: (status: StatusSubmitType) => void;
    changeMode: (mode: EditOrCreateModeType) => void;
};

export const TrainingsDrawerContext = createContext<TrainingsDrawerContextType>({
    open: false,
    modeDrawer: 'create',
    statusSubmit: 'error',
    changeMode: () => {},
    changeStatus: () => {},
    openDrawer: () => {},
    closeDrawer: () => {},
});
