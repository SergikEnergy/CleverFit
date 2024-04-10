import { FC, ReactNode, useMemo, useState } from 'react';

import { CollapsedContext } from './collapse-context';

export const CollapsedContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapsedState = () => setIsCollapsed((prev) => !prev);

    const hideCollapsed = () => setIsCollapsed(true);

    const value = useMemo(
        () => ({ collapsed: isCollapsed, toggleCollapsed: toggleCollapsedState, hideCollapsed }),
        [isCollapsed],
    );

    return <CollapsedContext.Provider value={value}>{children}</CollapsedContext.Provider>;
};
