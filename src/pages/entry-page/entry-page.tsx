import { FC, useContext } from 'react';
import { LoaderContextProvider } from '../../reactContexts/loaderStateContextProvider';
import { LoaderStateContext } from '../../reactContexts/loader-context';

import { LoaderAuth } from '@components/loader';

import './entry-page.css';

export const EntryPage: FC = () => {
    const { isLoading } = useContext(LoaderStateContext);
    console.log(isLoading);
    return (
        <LoaderContextProvider>
            <div className='entry-page'>Welcome to the Entry page</div>
            {isLoading && <LoaderAuth />}
        </LoaderContextProvider>
    );
};
