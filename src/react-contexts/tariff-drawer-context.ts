import { createContext } from 'react';

export type TariffDrawerContextType = {
    open: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
};

export const TariffDrawerContext = createContext<TariffDrawerContextType>({
    open: false,
    openDrawer: () => {},
    closeDrawer: () => {},
});
