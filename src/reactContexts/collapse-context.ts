import { createContext } from 'react';

export type CollapseContextType = {
    collapsed: boolean;
    toggleCollapsed: () => void;
};

export const CollapsedContext = createContext<CollapseContextType>({
    collapsed: false,
    toggleCollapsed: () => {
        return;
    },
});
