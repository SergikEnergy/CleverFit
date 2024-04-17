import { ReactNode } from 'react';
import { Typography } from 'antd';

import { MonthAchievementsBlock } from '../month-achievement-block';
import { WeekAchievementsBlock } from '../week-achievements-block';

type TabType = {
    label: string | ReactNode;
    key: string;
    children: ReactNode | string;
    disabled?: boolean;
};

const { Title } = Typography;

export const WEEK_ACHIEVEMENTS_KEY = 'week-achievements';
export const MONTH_ACHIEVEMENTS_KEY = 'month-achievements';
export const ALL_TIME_ACHIEVEMENTS_KEY = 'whole-achievements';

export const dataForTabsAchievements: TabType[] = [
    {
        label: (
            <Title
                className='achievements__tabs_title'
                level={3}
                style={{
                    color: 'inherit',
                    fontWeight: 500,
                    margin: 0,
                    fontFamily: "'Inter', Verdana, sans-serif",
                }}
            >
                За неделю
            </Title>
        ),
        key: WEEK_ACHIEVEMENTS_KEY,
        children: <WeekAchievementsBlock />,
    },
    {
        label: (
            <Title
                className='achievements__tabs_title'
                level={3}
                style={{
                    fontFamily: "'Inter', Verdana, sans-serif",
                    color: 'inherit',
                    fontWeight: 500,
                    margin: 0,
                }}
            >
                За месяц
            </Title>
        ),
        key: MONTH_ACHIEVEMENTS_KEY,
        children: <MonthAchievementsBlock />,
    },
    {
        label: (
            <Title
                className='achievements__tabs_title'
                level={3}
                style={{
                    fontFamily: "'Inter', Verdana, sans-serif",
                    color: 'inherit',
                    fontWeight: 500,
                    margin: 0,
                }}
            >
                За все время (PRO)
            </Title>
        ),
        key: ALL_TIME_ACHIEVEMENTS_KEY,
        children: 'Будет реализован для про тарифа',
        disabled: true,
    },
];
