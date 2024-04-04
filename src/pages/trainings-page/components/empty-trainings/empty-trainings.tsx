import { FC } from 'react';
import { useUserTrainingsSelector } from '@redux/selectors';
import { DRAWER_CREATE_MODE } from '@utils/constants/train-modes';
import { Button } from 'antd';

import { WORKOUT_DATA_TEST_ID } from '../../../../data/data-test-ids';
import { useTrainingsDrawerContext } from '../../../../react-contexts';

import classes from './empty-trainings.module.css';

export const EmptyTrainings: FC = () => {
    const { allowedTrainingsList } = useUserTrainingsSelector();
    const { openDrawer, changeMode } = useTrainingsDrawerContext();

    const handleCreateTrain = () => {
        changeMode(DRAWER_CREATE_MODE);
        openDrawer();
    };

    return (
        <div className={classes.empty}>
            <div className={classes.title}>У&nbsp;вас&nbsp;ещё&nbsp;нет созданных тренировок</div>
            {allowedTrainingsList.length > 0 && (
                <div className={classes.action}>
                    <Button
                        data-test-id={WORKOUT_DATA_TEST_ID.createNewTrainingButton}
                        size='large'
                        type='primary'
                        onClick={handleCreateTrain}
                        style={{ backgroundColor: '#2F54EB' }}
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}
        </div>
    );
};
