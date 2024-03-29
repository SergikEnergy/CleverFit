import { FC } from 'react';

import classes from './current-tariff-info.module.css';

type CurrentTariffInfoPropsType = {
    date: string;
};

export const CurrentTariffInfo: FC<CurrentTariffInfoPropsType> = ({ date }) => (
    <div className={classes.current}>Ваш PRO tatif активен до {date}</div>
);
