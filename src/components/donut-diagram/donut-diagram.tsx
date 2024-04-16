import { FC } from 'react';
import { Pie, PieConfig } from '@ant-design/charts';
import { useUserTrainingsSelector } from '@redux/selectors';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';

import { createDataForDiagram } from './donut-diagram.utils';

export const DonutDiagram: FC = () => {
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();
    const trainingsForDiagram = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const dataForDiagram = createDataForDiagram(trainingsForDiagram);

    const diagramConfig: PieConfig = {
        data: dataForDiagram,
        className: 'donut__chart',
        angleField: 'quantity',
        colorField: 'type',
        innerRadius: 0.7,
        interaction: {
            elementHighlight: true,
        },
        state: {
            inactive: { opacity: 0.8 },
        },
        margin: 60,
        label: {
            text: 'type',
            position: 'outside',
            connector: false,
            style: {
                fontWeight: 700,
                fontSize: 14,
                color: '#262626',
            },
        },
        legend: false,
        height: 340,
        width: 520,
        style: {
            fontWeight: 'bold',
        },
    };

    return dataForDiagram && <Pie {...diagramConfig} />;
};
