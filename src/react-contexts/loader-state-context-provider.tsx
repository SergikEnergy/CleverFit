import { FC, ReactNode, useMemo, useState } from 'react';

import { LoaderStateContext } from './loader-context';

export const LoaderContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoader = () => {
        setIsLoading(true);
    };

    const stopLoader = () => {
        setIsLoading(false);
    };

    const value = useMemo(
        () => ({
            isLoading,
            startLoader,
            stopLoader,
        }),
        [isLoading],
    );

    return <LoaderStateContext.Provider value={value}>{children}</LoaderStateContext.Provider>;
};
