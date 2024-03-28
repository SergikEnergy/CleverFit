import { useContext } from 'react';

import { TariffDrawerContext } from '../react-contexts';

export const useDrawerContext = () => useContext(TariffDrawerContext);
