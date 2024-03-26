import { FC } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Progress } from 'antd';

import classes from './loading-button.module.css';

export const LoadingProgress: FC = () => {
    const percent = useAppSelector((state) => state.uploadProgress.uploadProgress);

    return (
        <button aria-label='loading' type='button' className={classes.loading}>
            <span className={classes.title}>Загружаем</span>
            <Progress
                type='line'
                strokeColor='blue'
                strokeWidth={4}
                className={classes.progress}
                percent={percent}
            />
        </button>
    );
};
