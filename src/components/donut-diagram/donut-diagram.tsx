import { FC } from 'react';
import { Datum, Pie, PieConfig } from '@ant-design/charts';
import { useWindowWidth } from '@hooks/use-window-size';
import { useUserTrainingsSelector } from '@redux/selectors';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';
import { transformAllowedTrainingsToObject } from '@utils/transform-allowed-trainings-to-object';

import { createDataForDiagram } from './donut-diagram.utils';

export const DonutDiagram: FC = () => {
    const innerWindowWidth = useWindowWidth();
    const isMobileWidth = innerWindowWidth < 500;
    const { filteredTrainings, activeTrainings, allowedTrainingsList } = useUserTrainingsSelector();
    const allowedListObject = transformAllowedTrainingsToObject(allowedTrainingsList);
    const trainingsForDiagram = getFilteredTrainingsByName(
        filteredTrainings,
        activeTrainings,
        allowedListObject,
    );

    const dataForDiagram = createDataForDiagram(trainingsForDiagram);

    const diagramConfig: PieConfig = {
        data: dataForDiagram,
        inset: 2,
        className: 'donut__chart',
        angleField: 'percentage',
        colorField: 'type',
        innerRadius: 0.7,
        radius: 0.95,
        interaction: {
            elementHighlight: true,
        },
        state: {
            inactive: { opacity: 0.75 },
        },
        margin: isMobileWidth ? 30 : 60,
        label: {
            text: 'type',
            position: 'outside',
            connector: false,
            fontSize: isMobileWidth ? 12 : 14,
            fontWeight: 500,
            fontFamily: 'Inter',
            lineHeight: 1.3,
            fill: '#262626',
        },
        legend: false,
        height: isMobileWidth ? 211 : 340,
        width: isMobileWidth ? 330 : 520,
        tooltip: {
            field: 'percentage',
            name: 'Частота',
            valueFormatter: (data: Datum) => `${data} %`,
        },
    };

    return dataForDiagram && <Pie {...diagramConfig} />;
};
