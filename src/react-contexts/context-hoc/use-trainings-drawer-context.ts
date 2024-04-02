import { useContext } from 'react';

import { TrainingsDrawerContext } from '../trainings-drawer-context';

export const useTrainingsDrawerContext = () => useContext(TrainingsDrawerContext);
