import { FC, ReactNode } from 'react';

import classes from './resultsWrapper.module.css';

interface ResultsWrapperProps {
    children: ReactNode;
}

export const ResultsWrapper: FC<ResultsWrapperProps> = ({ children }) => (
    <div className={classes.statuses}>{children}</div>
);
