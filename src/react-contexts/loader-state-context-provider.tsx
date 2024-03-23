import { FC, ReactNode, useState } from 'react';

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
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <LoaderStateContext.Provider value={{ isLoading, startLoader, stopLoader }}>
            {children}
        </LoaderStateContext.Provider>
    );
};
