import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';

import classes from './edit-training-button.module.css';

type EditTrainingsButtonPropsType = {
    index: number;
    isDisabled?: boolean;
    actionClick?: () => void;
};

export const EditTrainingsButton: FC<EditTrainingsButtonPropsType> = ({
    actionClick,
    isDisabled = false,
    index,
}) => {
    const clickHandler = () => {
        if (actionClick) actionClick();
    };

    return (
        <Button
            data-test-id={`update-my-training-table-icon${index}`}
            onClick={clickHandler}
            className={classes.highlighter}
            type='text'
            disabled={isDisabled}
            icon={<EditOutlined disabled={isDisabled} className={classes.icon} />}
        />
    );
};
