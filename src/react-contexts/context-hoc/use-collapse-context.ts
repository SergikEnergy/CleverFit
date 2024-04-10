import { useContext } from 'react';

import { CollapsedContext } from '../collapse-context';

export const useCollapseContext = () => useContext(CollapsedContext);
