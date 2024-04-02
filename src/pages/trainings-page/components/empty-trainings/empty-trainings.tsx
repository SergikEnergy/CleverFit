import { FC } from 'react';
import { useUserTrainingsSelector } from '@redux/selectors';
import { Button } from 'antd';

import classes from './empty-trainings.module.css';

export const EmptyTrainings: FC = () => {
    const { allowedTrainingsList } = useUserTrainingsSelector();

    return (
        <div className={classes.empty}>
            <div className={classes.title}>У&nbsp;вас&nbsp;ещё&nbsp;нет созданных тренировок</div>
            {allowedTrainingsList.length > 0 && (
                <div className={classes.action}>
                    <Button size='large' type='primary' style={{ backgroundColor: '#2F54EB' }}>
                        Создать тренировку
                    </Button>
                </div>
            )}
        </div>
    );
};
