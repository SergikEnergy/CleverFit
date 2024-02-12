import { FC, ReactNode, useState } from 'react';
import { CollapsedContext } from './collapse-context';

export const CollapsedContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapsedState = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <CollapsedContext.Provider
            value={{ collapsed: isCollapsed, toggleCollapsed: toggleCollapsedState }}
        >
            {children}
        </CollapsedContext.Provider>
    );
};
