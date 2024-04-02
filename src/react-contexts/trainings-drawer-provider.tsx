import { FC, ReactNode, useMemo, useState } from 'react';

import { TrainingsDrawerContext } from './trainings-drawer-context';

export const TrainingsDrawerContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => {
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };
    const value = useMemo(() => ({ open: isOpen, openDrawer, closeDrawer }), [isOpen]);

    return (
        <TrainingsDrawerContext.Provider value={value}>{children}</TrainingsDrawerContext.Provider>
    );
};
