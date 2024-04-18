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
        autoFit: true,
        xField: 'date',
        yField: 'weight',
        style: {
            fill: '#85A5FFFF',
            width: 30,
        },
        height: isMobileWidth ? 240 : 374,
        tooltip: (_elem, index: number, data, column) => ({
            name: 'Нагрузка',
            value: `${column.y.value[index]} кг`,
        }),
        axis: {
            x: {
                labelAutoRotate: false,
                labelAutoHide: false,
                labelLineWidth: isMobileWidth ? 12 : 15,
                tick: false,
                title: 'Нагрузка, кг',
                titleSpacing: isMobileWidth ? 6 : 14,
                titlePosition: 'bottom',
                titleFontSize: isMobileWidth ? 12 : 14,
                // labelSpacing: isMobileWidth ? 6 : 14,
                label: {
                    style: {
                        textAlign: 'center',
                        fontSize: isMobileWidth ? 12 : 14,
                    },
                },
            },
            y: {
                labelSpacing: isMobileWidth ? 8 : 16,
                tick: false,
                labelFormatter: (val: number) => `${val} кг`,
            },
        },
        scrollbar: {
            x: { ratio: isTabletWidth ? 0.15 : 0.5 },
        },
        sizeField: (isMobileWidth && 16) || (isTabletWidth && 20) || 25,
    };

    return <Column {...configMonth} />;
};
