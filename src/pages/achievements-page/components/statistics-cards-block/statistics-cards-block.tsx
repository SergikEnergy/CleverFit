import { FC } from 'react';
import { useUserTrainingsSelector } from '@redux/selectors';
import { DAY_PER_WEEK } from '@utils/constants/achievements-data';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';

import { getReplays, getSummaryDifficulty } from './statistics-cards.utils';

import classes from './statistics-cards-block.module.css';

export const StatisticsCardsBlock: FC = () => {
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();

    const trainingsForStatistic = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const summaryDifficulty = getSummaryDifficulty(trainingsForStatistic);
    const difficultyPerWeek = summaryDifficulty / DAY_PER_WEEK;
    const replays = getReplays(trainingsForStatistic);

    return <div className={classes.statistics}>ff</div>;
};
