import { FC } from 'react';

import classes from './logo.module.css';

export const Logo: FC = () => {
    return (
        <div className={classes.logo}>
            <div>Text</div>
            <div className={classes['logo__icon']}>Icon</div>
        </div>
    );
};
