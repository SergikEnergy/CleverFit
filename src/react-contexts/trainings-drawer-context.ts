import { createContext } from 'react';

export type TrainingsDrawerContextType = {
    open: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
};

export const TrainingsDrawerContext = createContext<TrainingsDrawerContextType>({
    open: false,
    openDrawer: () => {},
    closeDrawer: () => {},
});
