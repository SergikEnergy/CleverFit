import { ReactNode } from 'react';
import { MyTrainingsContent } from '../my-trainings-content/my-trainings-content';

type TabType = {
    label: string | ReactNode;
    key: string;
    children: ReactNode | string;
};

export const dataForTabsTrainings: TabType[] = [
    {
        label: `Мои тренировки`,
        key: 'main-trainings',
        children: <MyTrainingsContent />,
    },
    {
        label: `Совместные тренировки`,
        key: 'together-trinings',
        children: `Content of Tab Pane 2`,
    },
    {
        label: `Марафоны`,
        key: 'maraphon-trainings',
        children: `Content of Tab Pane 3`,
    },
];
