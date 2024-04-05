import { FC } from 'react';

import classes from './together-trainings-title.module.css';

export const TogetherTrainingsTitle: FC = () => (
    <div className={classes.wrapper}>
        <h3 className={classes.title}>
            Хочешь тренироваться стем, кто разделяет твои цели и&nbsp;темп?
            <br />
            Можешь найти друга для совместных тренировок среди других пользователей.
        </h3>
        <p className={classes.subtitle}>
            Можешь воспользоваться случайным выбором или выбрать друга с&nbsp;похожим на&nbsp;твой
            уровень и&nbsp;вид тренировки, и&nbsp;мы&nbsp;найдем тебе идеального спортивного друга.
        </p>
    </div>
);
