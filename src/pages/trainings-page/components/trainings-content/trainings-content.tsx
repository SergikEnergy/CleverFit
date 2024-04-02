import { FC } from 'react';
import { Tabs } from 'antd';

import { dataForTabsTrainings } from './trainings-content.data';

import classes from './trainings-content.module.css';

export const TrainingsContent: FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <Tabs
            size='middle'
            className={classes.trainings_tabs}
            defaultActiveKey={dataForTabsTrainings[0].key}
            onChange={onChange}
            items={dataForTabsTrainings}
        />
    );
};
