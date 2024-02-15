import { createContext } from 'react';

export type LoaderContextType = {
    isLoading: boolean;
    startLoader: () => void;
    stopLoader: () => void;
};

const initialContext: LoaderContextType = {
    isLoading: false,
    startLoader: () => {
        return;
    },
    stopLoader: () => {
        return;
    },
};

export const LoaderStateContext = createContext<LoaderContextType>(initialContext);
