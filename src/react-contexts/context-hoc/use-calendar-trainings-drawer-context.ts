import { useContext } from 'react';

import { DrawerTrainsContext } from '../drawer-trains-context';

export const useCalendarTrainingsDrawerContext = () => useContext(DrawerTrainsContext);
