import { FC, useState, ReactNode } from 'react';
import { LoaderStateContext } from './loader-context';

export const LoaderContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoader = () => {
        setIsLoading(true);
    };

    const stopLoader = () => {
        setIsLoading(false);
    };

    return (
        <LoaderStateContext.Provider value={{ isLoading, startLoader, stopLoader }}>
            {children}
        </LoaderStateContext.Provider>
    );
};
