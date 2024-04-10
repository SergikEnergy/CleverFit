import { FC } from 'react';
import { Button } from 'antd';

import classes from './together-trainings-buttons.module.css';

type TogetherTrainingButtonsPropsType = {
    clickFirst?: () => void;
    clickSecond?: () => void;
};

export const TogetherTrainingButtons: FC<TogetherTrainingButtonsPropsType> = ({
    clickFirst,
    clickSecond,
}) => (
    <div className={classes.wrapper}>
        <Button
            onClick={() => {
                if (clickFirst) clickFirst();
            }}
            type='text'
            className={classes.button}
            style={{ color: '#2F54EB' }}
        >
            Случайный выбор
        </Button>
        <Button
            onClick={() => {
                if (clickSecond) clickSecond();
            }}
            type='text'
            className={classes.button}
            style={{ color: '#262626' }}
        >
            Выбор друга по моим тренировкам
        </Button>
    </div>
);
