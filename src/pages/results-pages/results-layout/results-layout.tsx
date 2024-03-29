import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import classes from './results-layout.module.css';

export const ResultsPageLayout: FC = () => (
    <div className={classes['results-page']}>
        <div className={classes['blur-background']}>
            <Outlet />
        </div>
    </div>
);
