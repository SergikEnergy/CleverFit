import { FC, Fragment } from 'react';
import { ChartColumn } from '@components/chart-column/chart-column';
import { DonutDiagram } from '@components/donut-diagram';
import { ListPopularExercises } from '@components/list-popular-exercises';
import { NotFoundTrainingPerPeriod } from '@components/not-found-training-per-period';
import { StatisticsTextBlock } from '@components/statistics-text-block';
import { TagsFilterBlock } from '@components/tags-filter-block';
import { useUserTrainingsSelector } from '@redux/selectors';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';
import { transformAllowedTrainingsToObject } from '@utils/transform-allowed-trainings-to-object';

import { ListWeekExercises } from '../list-week-exercises';
import { StatisticsCardsBlock } from '../statistics-cards-block';

import classes from './week-achievements-block.module.css';

export const WeekAchievementsBlock: FC = () => {
    const { filteredTrainings, activeTrainings, allowedTrainingsList } = useUserTrainingsSelector();
    const allowedListObject = transformAllowedTrainingsToObject(allowedTrainingsList);
    const filteredTrainingsByName = getFilteredTrainingsByName(
        filteredTrainings,
        activeTrainings,
        allowedListObject,
    );
    const isNotFoundShowed = filteredTrainingsByName.length === 0;

    return (
        <div className={classes.wrapper}>
            <TagsFilterBlock />
            {!isNotFoundShowed && (
                <Fragment>
                    <div className={classes.chart_list}>
                        <ChartColumn />
                        <ListWeekExercises />
                    </div>
                    <StatisticsCardsBlock />
                    <StatisticsTextBlock />
                    <div className={classes.diagram_list}>
                        <DonutDiagram />
                        <ListPopularExercises />
                    </div>
                </Fragment>
            )}
            {isNotFoundShowed && <NotFoundTrainingPerPeriod />}
        </div>
    );
};
