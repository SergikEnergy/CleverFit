import { FC } from 'react';

import classes from './empty-partners-block.module.css';

export const EmptyPartnersBlock: FC = () => (
    <div className={classes.wrapper}>
        <p className={classes.title}>Мои партнёры по тренировкам</p>
        <p className={classes.subtitle}>У вас пока нет партнёров для совместных тренировок</p>
    </div>
);
