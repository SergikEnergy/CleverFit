import { FC, useContext } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { ExerciseType } from '@redux/api/api-types';

import { DrawerTrainsContext } from '../../../react-contexts';

import classes from './exercise-item.module.css';

type ExerciseItemPropsType = {
    exercise: ExerciseType;
    index: number;
    disabledIcon: boolean;
};

export const ExerciseItem: FC<ExerciseItemPropsType> = ({ exercise, index, disabledIcon }) => {
    const { openDrawer, editedTrainName, setDrawerTitle, setTrainName } =
        useContext(DrawerTrainsContext);

    const handleEditTrainClick = () => {
        if (editedTrainName) {
            setDrawerTitle('Редактирование');
            setTrainName(editedTrainName);
        }
        openDrawer();
    };

    return (
        <li className={classes.exercise}>
            <span className={classes.name}>{exercise.name}</span>
            <EditOutlined
                disabled={disabledIcon}
                data-test-id={`modal-update-training-edit-button${index}`}
                onClick={handleEditTrainClick}
                style={disabledIcon ? { color: 'gray' } : { color: 'blue' }}
                className={classes.highlighter}
            />
        </li>
    );
};
