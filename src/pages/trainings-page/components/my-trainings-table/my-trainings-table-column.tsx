import type { ColumnsType } from 'antd/lib/table';

import { MyTrainingsTableDataType } from './my-trainings-table.types';
import { setPeriodToString } from './my-trainings-table.utils';

export const MyCustomColumns: ColumnsType<MyTrainingsTableDataType> = [
    {
        title: <span className='trainings__table_header'>Тип тренировки</span>,
        colSpan: 2,
        children: [
            {
                width: 6,
                title: null,
                dataIndex: 'badge',
                key: 'badge type',
                colSpan: 0,
                rowSpan: 0,
            },
            {
                title: null,
                width: 240,
                dataIndex: 'trainings',
                key: 'trainings type',
                colSpan: 0,
                rowSpan: 0,
            },
        ],
    },
    {
        title: 'Периодичность',
        rowSpan: 1,
        dataIndex: 'period',
        key: 'sorted period',
        defaultSortOrder: 'descend',
        sorter: (training1, training2) => training1.period - training2.period,
        render: (period) => {
            const stringedPeriod = setPeriodToString(period);

            return <span className='trainings__period_cell'>{stringedPeriod}</span>;
        },
    },
    { colSpan: 0, rowSpan: 0, title: null, dataIndex: 'action', key: 'edit button' },
];
