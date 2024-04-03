import { FC, Fragment } from 'react';
import { AlertNotification } from '@components/notifications/alert/alert-notification';
import { SUBMIT_TRAIN_SUCCESS } from '@utils/constants/train-modes';
import { Tabs } from 'antd';

import { useTrainingsDrawerContext } from '../../../../react-contexts';
import { TrainingsDrawer } from '../trainings-drawer';

import { dataForTabsTrainings } from './trainings-content.data';

import classes from './trainings-content.module.css';

export const TrainingsContent: FC = () => {
    const { open: isDrawerOpened, statusSubmit, changeStatus } = useTrainingsDrawerContext();

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
                    type='success'
                    message='Тренировка успешно обновлена'
                    handleCloseAlert={() => changeStatus('error')}
                />
            )}
        </Fragment>
    );
};
