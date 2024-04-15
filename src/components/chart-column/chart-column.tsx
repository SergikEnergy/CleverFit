import { FC } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { useWindowWidth } from '@hooks/use-window-size';
import { useUserTrainingsSelector } from '@redux/selectors';
import { createLastWeekData } from '@utils/create-last-period-data';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';

import { getTrainingsDifficulty } from './chart-column.utils';

import classes from './chart-column.module.css';

export const ChartColumn: FC = () => {
    const innerWindowWidth = useWindowWidth();
    const isMobileWidth = innerWindowWidth < 550;
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();
    const lastWeekDays = createLastWeekData();
    const trainingsForChart = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const chartData = lastWeekDays.map((date) => ({
        date,
        weight: getTrainingsDifficulty(trainingsForChart, date),
    }));

    const configWeek: ColumnConfig = {
        className: classes.chart,
        data: chartData,
        xField: 'date',
        yField: 'weight',
        style: {
            fill: '#85A5FFFF',
        },
        height: 374,
        axis: {
            x: {
                tick: false,
                title: 'Нагрузка, кг',
                titleSpacing: isMobileWidth ? 6 : 16,
                titlePosition: 'bottom',
                titleFontSize: isMobileWidth ? 10 : 14,
                labelSpacing: isMobileWidth ? 6 : 16,
            },
            y: {
                fontSize: 1,
                labelSpacing: isMobileWidth ? 6 : 16,
                tick: false,
                labelFormatter: (val: number) => `${val} кг`,
            },
        },

        sizeField: isMobileWidth ? 14 : 25,
    };

    return (
        <div className={classes.wrapper}>
            <Column {...configWeek} />
        </div>
    );
};
