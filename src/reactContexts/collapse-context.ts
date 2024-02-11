import { createContext } from 'react';

type CollapseContextType = {
    collapsed: boolean;
    toggleCollapsed: () => void;
};

export const CollapsedContext = createContext<CollapseContextType>({
    collapsed: false,
    toggleCollapsed: () => {
        return;
    },
});
