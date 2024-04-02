import { FC } from 'react';
import { Button } from 'antd';

import classes from './empty-trainings.module.css';

export const EmptyTrainings: FC = () => (
    <div className={classes.empty}>
        <div className={classes.title}>У вас ещё нет созданных тренировок</div>
        <div className={classes.action}>
            <Button size='large' type='primary' style={{ backgroundColor: '#2F54EB' }}>
                Создать тренировку
            </Button>
        </div>
    </div>
);
