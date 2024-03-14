import { FC, useContext } from 'react';
import { IExercise } from '@redux/API/api-types';
import { EditOutlined } from '@ant-design/icons';
import { DrawerTrainsContext } from '../../../reactContexts/drawerTrains-context';

import classes from './ExerciseItem.module.css';

interface ExerciseItemProps {
    exercise: IExercise;
}

export const ExerciseItem: FC<ExerciseItemProps> = ({ exercise }) => {
    const { openDrawer, editedTrain, setDrawerTitle, setTrainName } =
        useContext(DrawerTrainsContext);

    const handleEditTrainClick = () => {
        if (editedTrain) {
            setDrawerTitle('Редактирование');
            setTrainName(editedTrain);
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
