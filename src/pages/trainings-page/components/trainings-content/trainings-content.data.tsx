import { ReactNode } from 'react';

import { MyTrainingsContent } from '../my-trainings-content/my-trainings-content';
import { TogetherTrainingsContent } from '../together-trainings-content';

import { TogetherTabTitle } from './together-tab-title';

type TabType = {
    label: string | ReactNode;
    key: string;
    children: ReactNode | string;
};

export const MY_TRAINING_KEY = 'main-trainings';
export const TOGETHER_TRAINING_KEY = 'together-trinings';
export const MARATHONS_KEY = 'marathon-trainings';

export const dataForTabsTrainings: TabType[] = [
    {
        label: 'Мои тренировки',
        key: MY_TRAINING_KEY,
        children: <MyTrainingsContent />,
    },
    {
        label: <TogetherTabTitle />,
        key: TOGETHER_TRAINING_KEY,
        children: <TogetherTrainingsContent />,
    },
    {
        label: 'Марафоны',
        key: MARATHONS_KEY,
        children: 'Content of Tab Pane 3',
    },
];
