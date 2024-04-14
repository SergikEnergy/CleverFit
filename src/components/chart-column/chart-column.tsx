import { FC } from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';
import { defaultAllTrainingKey } from '@components/tags-filter-block/tags-default.data';
import { useUserTrainingsSelector } from '@redux/selectors';
import { dummyAllowedTrainings } from '@utils/constants/allowed-trainings';
import moment from 'moment';

import { createLastWeekData, getTrainingsDifficulty } from './chart-column.utils';

import classes from './chart-column.module.css';

export const ChartColumn: FC = () => {
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();
    const lastWeekDays = createLastWeekData();
    const trainingsForChart = filteredTrainings.filter((training) => {
        if (!activeTrainings || activeTrainings === defaultAllTrainingKey) {
            return true;
        }

        return training.name.toLowerCase() === dummyAllowedTrainings[activeTrainings].toLowerCase();
    });

    const chartData = lastWeekDays.map((date) => ({
        date,
        weight: getTrainingsDifficulty(trainingsForChart, date),
    }));
    console.log(chartData);

    const config: ColumnConfig = {
        className: classes.chart,
        data: chartData,
        xField: 'date',
        yField: 'weight',
        axis: {
            y: {
                tick: false,
                labelFormatter: (val: number) => `${val} кг`,
            },
        },
        // legend: true,
    };

    return (
        <div className={classes.wrapper}>
            <Column {...config} />
        </div>
    );
};
