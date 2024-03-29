import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import './entry-page-layout.css';

export const EntryPageLayout: FC = () => (
    <div className='entry-page'>
        <div className='blur-background'>
            <Outlet />
        </div>
    </div>
);
