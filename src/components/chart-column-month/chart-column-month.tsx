import { FC } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { getTrainingsDifficulty } from '@components/chart-column/chart-column.utils';
import { useWindowWidth } from '@hooks/use-window-size';
import { useUserTrainingsSelector } from '@redux/selectors';
import { createLastMonth } from '@utils/create-last-period-data';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';

import classes from './chart-column-month.module.css';

export const ChartColumnMonth: FC = () => {
    const innerWindowWidth = useWindowWidth();
    const isMobileWidth = innerWindowWidth < 550;
    const isTabletWidth = innerWindowWidth < 810;
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();
    const lastMonthDays = createLastMonth();
    const trainingsForChart = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const chartData = lastMonthDays.map((date) => ({
        date,
        weight: getTrainingsDifficulty(trainingsForChart, date),
    }));

    const configMonth: ColumnConfig = {
        className: classes.chart,
        data: chartData,
        xField: 'date',
        yField: 'weight',
        style: {
            fill: '#85A5FFFF',
        },
        height: isMobileWidth ? 236 : 374,
        axis: {
            x: {
                tick: false,
                title: 'Нагрузка, кг',
                titleSpacing: isMobileWidth ? 8 : 16,
                titlePosition: 'bottom',
                titleFontSize: isMobileWidth ? 12 : 14,
                labelSpacing: isMobileWidth ? 8 : 16,
                label: {
                    autoRotate: false,
                    style: {
                        textAlign: 'center',
                    },
                },
            },
            y: {
                fontSize: 1,
                labelSpacing: isMobileWidth ? 8 : 16,
                tick: false,
                labelFormatter: (val: number) => `${val} кг`,
            },
        },
        scrollbar: {
            x: { ratio: isMobileWidth ? 0.5 : 0.65 },
        },
        sizeField: (isMobileWidth && 15) || (isTabletWidth && 20) || 25,
    };

    return <Column {...configMonth} />;
};
