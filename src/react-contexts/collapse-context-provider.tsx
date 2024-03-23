import { FC, ReactNode, useState } from 'react';

import { CollapsedContext } from './collapse-context';

export const CollapsedContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapsedState = () => {
        setIsCollapsed((prev) => !prev);
    };

    const hideCollapsed = () => {
        setIsCollapsed(true);
    };

    return (
        <CollapsedContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{ collapsed: isCollapsed, toggleCollapsed: toggleCollapsedState, hideCollapsed }}
        >
            {children}
        </CollapsedContext.Provider>
    );
};
