import { FC, ReactNode, useMemo, useState } from 'react';

import { TariffDrawerContext } from './tariff-drawer-context';

export const TariffDrawerContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => setIsOpen(true);

    const closeDrawer = () => setIsOpen(false);

    const value = useMemo(() => ({ open: isOpen, openDrawer, closeDrawer }), [isOpen]);

    return <TariffDrawerContext.Provider value={value}>{children}</TariffDrawerContext.Provider>;
};
