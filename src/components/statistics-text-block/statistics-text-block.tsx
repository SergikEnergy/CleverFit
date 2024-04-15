import { FC } from 'react';
import { defaultAllTrainingKey } from '@components/tags-filter-block/tags-default.data';
import { useUserTrainingsSelector } from '@redux/selectors';
import { dummyAllowedTrainings } from '@utils/constants/allowed-trainings';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';

import { getMoreOftenExercise, getMoreOftenTraining } from './statistics-text.utils';

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

    return (
        <div className={classes.container}>
            {isSelectedAll && (
                <div className={classes.line}>
                    <div className={classes.title}>Самая частая тренировка</div>
                    <div className={classes.name}>{moreOftenTrainingAll}</div>
                </div>
            )}
            <div className={classes.line}>
                <div className={classes.title}>Самое частое упражнение</div>
                <div className={classes.name}>{moreOftenExercise}</div>
            </div>
        </div>
    );
};
