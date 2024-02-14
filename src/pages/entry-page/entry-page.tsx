import { FC } from 'react';
import { FormTypeContextProvider } from '../../reactContexts/formTypeContextProvider';

import './entry-page.css';

export const EntryPage: FC = () => {
    return (
        <FormTypeContextProvider>
            <div className='entry-page'>Welcome to the Entry page</div>
        </FormTypeContextProvider>
    );
};
