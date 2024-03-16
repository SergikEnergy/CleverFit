import { FC, useContext } from 'react';
import { IExercise } from '@redux/API/api-types';
import { EditOutlined } from '@ant-design/icons';
import { DrawerTrainsContext } from '../../../reactContexts';

import classes from './ExerciseItem.module.css';

interface ExerciseItemProps {
    exercise: IExercise;
}

export const ExerciseItem: FC<ExerciseItemProps> = ({ exercise }) => {
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
                onClick={handleEditTrainClick}
                style={{ color: 'blue' }}
                className={classes.highlighter}
            />
        </li>
    );
};
