import { FC, ReactNode } from 'react';

import classes from './resultsWrapper.module.css';

type ResultsWrapperPropsType = {
    children: ReactNode;
};

export const ResultsWrapper: FC<ResultsWrapperPropsType> = ({ children }) => (
    <div className={classes.statuses}>{children}</div>
);
