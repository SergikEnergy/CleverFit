import { FC, Fragment } from 'react';
import { ChartColumnMonth } from '@components/chart-column-month';
import { DonutDiagram } from '@components/donut-diagram';
import { ListPopularExercises } from '@components/list-popular-exercises';
import { NotFoundTrainingPerPeriod } from '@components/not-found-training-per-period';
import { StatisticsTextBlock } from '@components/statistics-text-block';
import { TagsFilterBlock } from '@components/tags-filter-block';
import { useUserTrainingsSelector } from '@redux/selectors';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';
import { transformAllowedTrainingsToObject } from '@utils/transform-allowed-trainings-to-object';

import { StatisticsCardsBlock } from '../statistics-cards-block';
import { WeeksStatisticsBlock } from '../weeks-statistics-block';

import classes from './month-achievements-block.module.css';

export const MonthAchievementsBlock: FC = () => {
    const { filteredTrainings, activeTrainings, allowedTrainingsList } = useUserTrainingsSelector();
    const allowedListObject = transformAllowedTrainingsToObject(allowedTrainingsList);
    const filteredTrainingsByName = getFilteredTrainingsByName(
        filteredTrainings,
        activeTrainings,
        allowedListObject,
    );

    return (
        <div className={classes.wrapper}>
            <TagsFilterBlock />
            {filteredTrainingsByName.length !== 0 && (
                <Fragment>
                    <ChartColumnMonth />
                    <WeeksStatisticsBlock />
                    <StatisticsCardsBlock period='month' />
                    <StatisticsTextBlock />
                    <div className={classes.diagram_list}>
                        <DonutDiagram />
                        <ListPopularExercises period='month' />
                    </div>
                </Fragment>
            )}
            {filteredTrainingsByName.length === 0 && <NotFoundTrainingPerPeriod />}
        </div>
    );
};
