import { FC } from 'react';

import { Typography } from 'antd';
import classes from './aboutApp.module.css';

export const AboutApp: FC = () => {
    return (
        <div className={classes.about}>
            <Typography.Text className={classes.line}>C CleverFit ты сможешь:</Typography.Text>
            <Typography.Text className={classes.line}>
                — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
            </Typography.Text>
            <Typography.Text className={classes.line}>
                — отслеживать свои достижения в разделе статистики, сравнивая свои результаты c
                нормами и рекордами;
            </Typography.Text>
            <Typography.Text className={classes.line}>
                — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы{' '}
                <span className={classes.space}>o тренировках</span>;
            </Typography.Text>
            <Typography.Text className={classes.line}>
                — выполнять расписанные тренировки для разных частей тела, следуя подробным
                инструкциям и советам профессиональных тренеров.
            </Typography.Text>
        </div>
    );
};
