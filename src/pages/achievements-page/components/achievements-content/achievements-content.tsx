import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setFilteredTrainingsByPeriod } from '@redux/reducers/trainings-slice';
import { useUserTrainingsSelector } from '@redux/selectors';
import { Tabs } from 'antd';

import {
    dataForTabsAchievements,
    MONTH_ACHIEVEMENTS_KEY,
    WEEK_ACHIEVEMENTS_KEY,
} from './achievements-tabs.data';

import classes from './achievements-content.module.css';

export const AchievementsContent: FC = () => {
    const dispatch = useAppDispatch();
    const [activeKey, setActiveKey] = useState('');
    const firstRender = useRef(true);
    const { userTrainings } = useUserTrainingsSelector();

    const onChange = (key: string) => setActiveKey(key);

    useEffect(() => {
        if (firstRender.current && userTrainings.length > 0) {
            dispatch(setFilteredTrainingsByPeriod('week'));
            firstRender.current = false;
        }
    }, [dispatch, userTrainings.length]);

    useEffect(() => {
        if (activeKey === WEEK_ACHIEVEMENTS_KEY) {
            dispatch(setFilteredTrainingsByPeriod('week'));
        }
        if (activeKey === MONTH_ACHIEVEMENTS_KEY) {
            dispatch(setFilteredTrainingsByPeriod('month'));
        }
    }, [activeKey, dispatch]);

    return (
        <Tabs
            size='middle'
            defaultActiveKey={activeKey}
            className={classes.tabs}
            onChange={onChange}
            items={dataForTabsAchievements}
        />
    );
};
