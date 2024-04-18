import { FC } from 'react';
import { StatisticDifficultyCard } from '@components/statistic-difficulty-card';
import { FilterPeriodType } from '@redux/reducers/trainings-slice';
import { useUserTrainingsSelector } from '@redux/selectors';
import { DAY_PER_MONTH, DAY_PER_WEEK } from '@utils/constants/achievements-data';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';
import { transformAllowedTrainingsToObject } from '@utils/transform-allowed-trainings-to-object';

import { getReplaysAndApproaches, getSummaryDifficulty } from './statistics-cards.utils';

import classes from './statistics-cards-block.module.css';

type StatisticsCardsBlockType = {
    period?: FilterPeriodType;
};

export const StatisticsCardsBlock: FC<StatisticsCardsBlockType> = ({ period }) => {
    const { filteredTrainings, activeTrainings, allowedTrainingsList } = useUserTrainingsSelector();
    const allowedListObject = transformAllowedTrainingsToObject(allowedTrainingsList);
    const trainingsForStatistic = getFilteredTrainingsByName(
        filteredTrainings,
        activeTrainings,
        allowedListObject,
    );

    const summaryDifficulty = getSummaryDifficulty(trainingsForStatistic);
    const difficultyPerWeek = Math.ceil((summaryDifficulty / DAY_PER_WEEK) * 10) / 10;
    const difficultyPerMonth = Math.ceil((summaryDifficulty / DAY_PER_MONTH) * 10) / 10;
    const [replays, approaches] = getReplaysAndApproaches(trainingsForStatistic);
    const dataForCards = [
        { key: 'summary difficulty', title: 'Общая нагрузка,\u00A0кг', count: summaryDifficulty },
        {
            key: 'average difficulty',
            title: 'Нагрузка в\u00A0день,\u00A0кг',
            count: period && period === 'month' ? difficultyPerMonth : difficultyPerWeek,
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
