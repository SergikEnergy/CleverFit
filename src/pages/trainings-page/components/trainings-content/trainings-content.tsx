import { FC, Fragment, useEffect, useState } from 'react';
import { AlertNotification } from '@components/notifications/alert/alert-notification';
import { useGetAllTrainingPartners } from '@hooks/use-get-all-training-partners';
import { DRAWER_EDIT_MODE, SUBMIT_TRAIN_SUCCESS } from '@utils/constants/train-modes';
import { Tabs } from 'antd';

import { WORKOUT_DATA_TEST_ID } from '../../../../data/data-test-ids';
import { useTrainingsDrawerContext } from '../../../../react-contexts';
import { TrainingsDrawer } from '../trainings-drawer';

import { dataForTabsTrainings, TOGETHER_TRAINING_KEY } from './trainings-content.data';

import classes from './trainings-content.module.css';

export const TrainingsContent: FC = () => {
    const fetchUserTrainingPartners = useGetAllTrainingPartners();
    const {
        open: isDrawerOpened,
        statusSubmit,
        changeStatus,
        modeDrawer,
    } = useTrainingsDrawerContext();
    const [activeKey, setActiveKey] = useState('');

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    useEffect(() => {
        if (activeKey === TOGETHER_TRAINING_KEY) {
            fetchUserTrainingPartners();
        }
    }, [activeKey, fetchUserTrainingPartners]);

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
