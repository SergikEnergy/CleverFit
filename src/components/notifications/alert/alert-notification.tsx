import { FC } from 'react';
import { Alert, AlertProps } from 'antd';

import classes from './alert-notification.module.css';

type AlertNotificationPropsType = {
    message: string;
    type: AlertProps['type'];
    handleCloseAlert: () => void;
    dataTestId?: string;
};

export const AlertNotification: FC<AlertNotificationPropsType> = ({
    message,
    type,
    handleCloseAlert,
    dataTestId,
}) => {
    const handleClose = () => {
        handleCloseAlert();
    };

    return (
        <Alert
            data-test-id={dataTestId}
            showIcon={true}
            className={classes.alert}
            message={message}
            type={type}
            closable={true}
            afterClose={handleClose}
        />
    );
};
