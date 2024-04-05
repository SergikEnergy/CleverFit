import { FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TrainingsResponseType } from '@redux/api/api-types';
import { DRAWER_EDIT_MODE } from '@utils/constants/train-modes';
import { getColorTrainByName } from '@utils/get-color-badge-by-name';
import { Button, Divider } from 'antd';
import moment from 'moment';

import { useTrainingsDrawerContext } from '../../../../react-contexts';

import classes from './custom-overlay.module.css';

type CustomOverlayPropsType = {
    training: TrainingsResponseType;
    closeAction: () => void;
};

export const CustomOverlay: FC<CustomOverlayPropsType> = ({ training, closeAction }) => {
    const isPastDate = moment(training.date).isSameOrBefore(moment());
    const disabledAddButton = isPastDate && training.isImplementation;
    const { openDrawer, changeMode, changeActiveTrainingId } = useTrainingsDrawerContext();

    const handleAddExercisesClick = () => {
        changeMode(DRAWER_EDIT_MODE);
        changeActiveTrainingId(training._id);
        openDrawer();
    };

    return (
        <div className={classes.overlay}>
            <div className={classes.header}>
                <Button
                    type='text'
                    className={classes.close}
                    icon={<ArrowLeftOutlined style={{ color: '#262626' }} />}
                    onClick={closeAction}
                />
                <div className={classes.name}>{training.name}</div>
            </div>
            <Divider
                style={{
                    marginTop: 0,
                    marginBottom: 16,
                    borderColor: `${getColorTrainByName(training.name)}`,
                }}
            />
            <ul className={classes.exercises__list}>
                {training.exercises.map((exercise, index) => (
                    <li key={`${exercise.name}-${index + 1}`} className={classes.exercise}>
                        {exercise.name}
                    </li>
                ))}
            </ul>
            <Divider style={{ marginTop: 2, marginBottom: 16 }} />
            <Button
                className={classes.button}
                block={true}
                disabled={disabledAddButton}
                type='ghost'
                onClick={handleAddExercisesClick}
            >
                Добавить упражнения
            </Button>
        </div>
    );
};
