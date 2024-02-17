import { FC, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { LoaderContextProvider } from '../../reactContexts/loaderStateContextProvider';
import { LoaderStateContext } from '../../reactContexts/loader-context';

import { LoaderAuth } from '@components/loader';

import './entryPageLayout.css';

export const EntryPageLayout: FC = () => {
    const { isLoading } = useContext(LoaderStateContext);
    return (
        <LoaderContextProvider>
            <div className='entry-page'>
                <div className='blur-background'>
                    <Outlet />
                </div>
            </div>
            {isLoading && <LoaderAuth />}
        </LoaderContextProvider>
    );
};
