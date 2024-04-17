import { FC } from 'react';
import { Pie, PieConfig } from '@ant-design/charts';
import { useWindowWidth } from '@hooks/use-window-size';
import { useUserTrainingsSelector } from '@redux/selectors';
import { getFilteredTrainingsByName } from '@utils/get-filtered-trainings-by-name';

import { createDataForDiagram, DiagramDataType } from './donut-diagram.utils';

const labelsDiagram = (_, data: DiagramDataType) => (
    <span className='labels__donut'>{data.type}</span>
);
const customLabel = (_, datum) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 8, height: 8, background: 'rgba(0,0,0,0.4)', borderRadius: '50%' }} />
        <div>{datum.type}</div>
    </div>
);

export const DonutDiagram: FC = () => {
    const innerWindowWidth = useWindowWidth();
    const isMobileWidth = innerWindowWidth < 500;
    const { filteredTrainings, activeTrainings } = useUserTrainingsSelector();
    const trainingsForDiagram = getFilteredTrainingsByName(filteredTrainings, activeTrainings);

    const dataForDiagram = createDataForDiagram(trainingsForDiagram);

    const diagramConfig: PieConfig = {
        data: dataForDiagram,
        className: 'donut__chart',
        angleField: 'percentage',
        colorField: 'type',
        innerRadius: 0.7,
        interaction: {
            elementHighlight: true,
        },
        state: {
            inactive: { opacity: 0.75 },
        },
        margin: isMobileWidth ? 20 : 60,
        label: {
            text: 'type',
            position: 'outside',
            connector: false,
            style: {
                fontWeight: isMobileWidth ? 500 : 700,
                fontSize: isMobileWidth ? 12 : 14,
                color: '#262626',
                whiteSpace: '',
            },
            render: customLabel,
        },
        legend: false,
        height: isMobileWidth ? 211 : 340,
        width: isMobileWidth ? 330 : 520,
        style: {
            fontWeight: 'bold',
        },
    };

    return dataForDiagram && <Pie {...diagramConfig} />;
};
