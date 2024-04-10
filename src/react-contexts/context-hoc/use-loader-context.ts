import { useContext } from 'react';

import { LoaderStateContext } from '../loader-context';

export const useLoaderContext = () => useContext(LoaderStateContext);
