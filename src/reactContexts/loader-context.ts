import { createContext } from 'react';

export type LoaderContextType = {
    isLoading: boolean;
    startLoader: () => void;
    stopLoader: () => void;
};

export const LoaderStateContext = createContext<LoaderContextType>({
    isLoading: false,
    startLoader: () => {
        return;
    },
    stopLoader: () => {
        return;
    },
});
