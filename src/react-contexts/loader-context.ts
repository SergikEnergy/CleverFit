import { createContext } from 'react';

export type LoaderContextType = {
    isLoading: boolean;
    startLoader: () => void;
    stopLoader: () => void;
};

const initialContext: LoaderContextType = {
    isLoading: false,
    startLoader: () => {
        
    },
    stopLoader: () => {
        
    },
};

export const LoaderStateContext = createContext<LoaderContextType>(initialContext);
