import { FC } from 'react';
import { Alert, AlertProps } from 'antd';

import classes from './alert-notification.module.css';

type AlertNotificationPropsType = {
    message: string;
    type: AlertProps['type'];
    handleCloseAlert: () => void;
};

export const AlertNotification: FC<AlertNotificationPropsType> = ({
    message,
    type,
    handleCloseAlert,
}) => {
    const handleClose = () => {
        handleCloseAlert();
    };

    return (
        <Alert
            showIcon={true}
            className={classes.alert}
            message={message}
            type={type}
            closable={true}
            afterClose={handleClose}
        />
    );
};
