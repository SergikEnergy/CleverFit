import { FC } from 'react';
import { CustomNotFoundIcon } from '@components/custom-not-found-icon';
import { useUserTrainingsSelector } from '@redux/selectors';
import { Result } from 'antd';

import classes from './not-found-training-per-period.module.css';

export const NotFoundTrainingPerPeriod: FC = () => {
    const { selectedPeriod } = useUserTrainingsSelector();
    const period =
        (selectedPeriod === 'week' && 'на\u00A0этой неделе') ||
        (selectedPeriod === 'month' && 'в\u00A0этом месяце');
    const title = `Ой, такой тренировки ${period} не\u00A0было.`;

    return (
        <div className={classes.wrapper}>
            <Result
                className={classes.result}
                icon={<CustomNotFoundIcon />}
                title={title}
                extra={null}
            />
        </div>
    );
};
