import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Button } from 'antd';

import classes from './alert-cancel-edit-train.module.css';

type AlertCancelEditTrainPropsType = {
    currentTimerID: ReturnType<typeof setTimeout>;
    closeAlert: () => void;
};

export const AlertCancelEditTrain: FC<AlertCancelEditTrainPropsType> = ({
    currentTimerID,
    closeAlert,
}) => {
    const message = 'Обратите внимание!';
    const description =
        'После сохранения внесенных изменений отредактировать проведенную тренировку будет невозможно';
    const buttonText = 'Отменить';

    const handleCancelClick = () => {
        closeAlert();
        clearTimeout(currentTimerID);
    };

    return (
        <Alert
            showIcon={true}
            className={classes.alert}
            type='warning'
            message={
                <div className={classes.header}>
                    <span className={classes.title}>{message}</span>
                    <Button
                        className={classes.cancel}
                        icon={<LoadingOutlined />}
                        size='small'
                        type='ghost'
                        onClick={handleCancelClick}
                    >
                        {buttonText}
                    </Button>
                </div>
            }
            description={description}
        />
    );
};
