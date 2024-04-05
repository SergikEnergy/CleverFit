import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@hooks/use-window-size';
import { useUserTrainingsSelector } from '@redux/selectors';
import { DRAWER_ADD_MODE, DRAWER_EDIT_MODE } from '@utils/constants/train-modes';
import { Button, Table } from 'antd';

import { WORKOUT_DATA_TEST_ID } from '../../../../data/data-test-ids';
import { useTrainingsDrawerContext } from '../../../../react-contexts';
import { EditTrainingsButton } from '../edit-training-button/edit-training-button';
import { TrainingCell, TrainingsBadge } from '../training-with-badge-cell/training-with-badge-cell';

import { MyTrainingsTableDataType } from './my-trainings-table.types';
import { MyCustomColumns } from './my-trainings-table-column';

import classes from './my-trainings-table.module.css';

export const MyTrainingsTable: FC = () => {
    const innerWindowWidth = useWindowWidth();
    const { userTrainings } = useUserTrainingsSelector();
    const { changeMode, openDrawer, changeActiveTrainingId } = useTrainingsDrawerContext();

    const handleCreateButtonClick = () => {
        changeMode(DRAWER_ADD_MODE);
        changeActiveTrainingId('');
        openDrawer();
    };

    const setActiveTrain = (trainingId: string) => {
        changeActiveTrainingId(trainingId);
        changeMode(DRAWER_EDIT_MODE);
        openDrawer();
    };

    const tableData: MyTrainingsTableDataType[] = userTrainings.map((training, index) => ({
        key: `${training._id}-${training.date}`,
        period: training.parameters ? training.parameters.period : 0,
        badge: (
            <TrainingsBadge
                key={`${training.name}${training.date}-badge`}
                isImplemented={training.isImplementation}
                trainingName={training.name}
            />
        ),
        trainings: (
            <TrainingCell
                key={training.name}
                training={training}
                isImplemented={training.isImplementation}
            />
        ),
        action: (
            <EditTrainingsButton
                index={index}
                actionClick={() => setActiveTrain(training._id)}
                isDisabled={training.isImplementation}
            />
        ),
    }));

    return (
        <div className={classes.wrapper}>
            <Table
                data-test-id={WORKOUT_DATA_TEST_ID.myTrainingsTable}
                className={classes.table}
                onHeaderRow={() => ({ className: classes.header })}
                dataSource={tableData}
                columns={MyCustomColumns}
                pagination={{
                    defaultCurrent: 1,
                    hideOnSinglePage: true,
                    className: classes.pagination,
                    pageSize: innerWindowWidth > 600 ? 14 : 9,
                }}
            />
            <Button
                data-test-id={WORKOUT_DATA_TEST_ID.createNewTrainingButton}
                type='primary'
                onClick={handleCreateButtonClick}
                icon={<PlusOutlined />}
                className={classes.add__train}
                size='large'
                style={{ backgroundColor: '#2F54EB', border: 'none' }}
            >
                Новая тренировка
            </Button>
        </div>
    );
};
