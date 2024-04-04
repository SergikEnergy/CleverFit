import { FC, Fragment } from 'react';
import { AlertNotification } from '@components/notifications/alert/alert-notification';
import { DRAWER_EDIT_MODE, SUBMIT_TRAIN_SUCCESS } from '@utils/constants/train-modes';
import { Tabs } from 'antd';

import { WORKOUT_DATA_TEST_ID } from '../../../../data/data-test-ids';
import { useTrainingsDrawerContext } from '../../../../react-contexts';
import { TrainingsDrawer } from '../trainings-drawer';

import { dataForTabsTrainings } from './trainings-content.data';

import classes from './trainings-content.module.css';

export const TrainingsContent: FC = () => {
    const {
        open: isDrawerOpened,
        statusSubmit,
        changeStatus,
        modeDrawer,
    } = useTrainingsDrawerContext();

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <Fragment>
            <Tabs
                size='middle'
                className={classes.trainings_tabs}
                defaultActiveKey={dataForTabsTrainings[0].key}
                onChange={onChange}
                items={dataForTabsTrainings}
            />
            {isDrawerOpened && <TrainingsDrawer />}
            {statusSubmit === SUBMIT_TRAIN_SUCCESS && (
                <AlertNotification
                    dataTestId={WORKOUT_DATA_TEST_ID.createTrainingSuccessAlert}
                    type='success'
                    message={
                        modeDrawer === DRAWER_EDIT_MODE
                            ? 'Тренировка успешно обновлена'
                            : 'Новая тренировка успешно добавлена'
                    }
                    handleCloseAlert={() => changeStatus('error')}
                />
            )}
        </Fragment>
    );
};
