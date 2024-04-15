import { FC } from 'react';
import { StatisticDifficultyCard } from '@components/statistic-difficulty-card';
import { useUserTrainingsSelector } from '@redux/selectors';
import { DAY_PER_WEEK } from '@utils/constants/achievements-data';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';

import { getReplaysAndApproaches, getSummaryDifficulty } from './statistics-cards.utils';

import classes from './statistics-cards-block.module.css';

export const StatisticsCardsBlock: FC = () => {
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();

    const trainingsForStatistic = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const summaryDifficulty = getSummaryDifficulty(trainingsForStatistic);
    const difficultyPerWeek = Math.ceil((summaryDifficulty / DAY_PER_WEEK) * 10) / 10;
    const [replays, approaches] = getReplaysAndApproaches(trainingsForStatistic);
    const dataForCards = [
        { key: 'summary difficulty', title: 'Общая нагрузка,\u00A0кг', count: summaryDifficulty },
        {
            key: 'average difficulty',
            title: 'Нагрузка в\u00A0день,\u00A0кг',
            count: difficultyPerWeek,
        },
        { key: 'summary replays', title: 'Количество повторений,\u00A0раз', count: replays },
        { key: 'summary approaches', title: 'Подходы, раз', count: approaches },
    ];

    return (
        <div className={classes.statistics}>
            {dataForCards.map((data) => (
                <StatisticDifficultyCard {...data} />
            ))}
        </div>
    );
};
