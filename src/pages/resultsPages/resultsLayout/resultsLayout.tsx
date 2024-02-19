import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import classes from './resultsLayout.module.css';

export const ResultsPageLayout: FC = () => (
    <div className={classes['results-page']}>
        <div className={classes['blur-background']}>
            <Outlet />
        </div>
    </div>
);
