import { FC } from 'react';
import { Typography } from 'antd';
import classnames from 'classnames';

import { useCollapseContext } from '../../react-contexts';

import classes from './about-app.module.css';

export const AboutApp: FC = () => {
    const { collapsed } = useCollapseContext();

    return (
        <div className={classnames(classes.about, { [classes.collapsed]: collapsed })}>
            <Typography.Text className={classes.line}>C CleverFit ты сможешь:</Typography.Text>
            <Typography.Text className={classes.line}>
                — планировать свои тренировки на календаре, выбирая тип и&nbsp;уровень нагрузки;
            </Typography.Text>
            <Typography.Text className={classes.line}>
                — отслеживать свои достижения в разделе статистики, сравнивая свои результаты c
                нормами и&nbsp;рекордами;
            </Typography.Text>
            <Typography.Text className={classes.line}>
                — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы
                o&nbsp;тренировках
            </Typography.Text>
            <Typography.Text className={classes.line}>
                — выполнять расписанные тренировки для разных частей тела, следуя подробным
                инструкциям и&nbsp;советам профессиональных тренеров.
            </Typography.Text>
        </div>
    );
};
