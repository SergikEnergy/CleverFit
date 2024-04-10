import { useContext } from 'react';

import { TariffDrawerContext } from '../tariff-drawer-context';

export const useTariffDrawerContext = () => useContext(TariffDrawerContext);
