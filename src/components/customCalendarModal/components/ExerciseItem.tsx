import { FC } from 'react';
import { IExercise } from '@redux/API/api-types';
import { EditOutlined } from '@ant-design/icons';

import classes from './TrainWithBadge.module.css';

interface ExerciseItemProps {
    exercise: IExercise;
}

export const ExerciseItem: FC<ExerciseItemProps> = ({ exercise }) => {
    return (
        <li className={classes.exercise}>
            <p className={classes.name}>{exercise.name}</p>
            <EditOutlined style={{ color: 'blue' }} className={classes.highlighter} />
        </li>
    );
};
