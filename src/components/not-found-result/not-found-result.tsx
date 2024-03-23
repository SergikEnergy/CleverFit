import { FC } from 'react';

import classes from './not-found-result.module.css';

type NotFoundResultPropsType = {
    //
};

export const NotFoundResult: FC<NotFoundResultPropsType> = () => {
    const arr = [1, 2, 3];

    return <div className={classes.class}>Not found content{arr}</div>;
};
