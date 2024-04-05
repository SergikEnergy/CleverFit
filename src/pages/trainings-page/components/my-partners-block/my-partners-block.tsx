import { FC } from 'react';

import classes from './my-partners-block.module.css';

export const MyPartnersBlock: FC = () => (
    <div className={classes.wrapper}>
        <p className={classes.title}>Мои партнёры по тренировкам</p>
    </div>
);
