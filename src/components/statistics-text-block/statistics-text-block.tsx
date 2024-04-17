import { FC } from 'react';
import { defaultAllTrainingKey } from '@components/tags-filter-block/tags-default.data';
import { useUserTrainingsSelector } from '@redux/selectors';
import {
    dummyAllowedTrainings,
    dummyAllowedTrainingsAccusative,
} from '@utils/constants/allowed-trainings';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';
import { getMoreOftenTraining } from '@utils/get-more-often-training';

import { getMoreOftenExercise } from './statistics-text.utils';

import classes from './statistics-text-block.module.css';

export const StatisticsTextBlock: FC = () => {
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();
    const isSelectedAll = activeTrainings === defaultAllTrainingKey;
    const moreOftenTrainingKey = getMoreOftenTraining(filteredTrainings);
    const moreOftenTrainingAll = dummyAllowedTrainings[moreOftenTrainingKey];

    const trainingsForTextBlock = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const filteredByMoreTraining = getFilteredTrainingsByName(
        filteredTrainings,
        moreOftenTrainingKey,
    );

    const moreOftenExercise = getMoreOftenExercise(
        isSelectedAll ? filteredByMoreTraining : trainingsForTextBlock,
    );
    const moreOftenExerciseText = isSelectedAll
        ? 'Самое частое упражнение'
        : `Самое частое упражнение ${dummyAllowedTrainingsAccusative[activeTrainings]}`;

    return (
        <div className={classes.container}>
            {isSelectedAll && (
                <div className={classes.line}>
                    <div className={classes.title}>Самая частая тренировка</div>
                    <div className={classes.name}>{moreOftenTrainingAll}</div>
                </div>
            )}
            <div className={classes.line}>
                <div className={classes.title}>{moreOftenExerciseText}</div>
                <div className={classes.name}>{moreOftenExercise}</div>
            </div>
        </div>
    );
};
