import { FC, useContext } from 'react';
import { IExercise } from '@redux/API/api-types';
import { EditOutlined } from '@ant-design/icons';
import { DrawerTrainsContext } from '../../../reactContexts';

import classes from './ExerciseItem.module.css';

interface ExerciseItemProps {
    exercise: IExercise;
    index: number;
    disabledIcon: boolean;
}

export const ExerciseItem: FC<ExerciseItemProps> = ({ exercise, index, disabledIcon }) => {
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
