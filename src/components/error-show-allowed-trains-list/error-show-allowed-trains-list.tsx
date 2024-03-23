import { FC } from 'react';
import { CloseCircleTwoTone, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import classes from './error-show-allowed-trains-list.module.css';

type StatusMessageType = 'success' | 'error' | 'info';

const getIconFromStatus = (status: StatusMessageType = 'error') => {
    switch (status) {
        case 'success':
            return <CloseCircleTwoTone style={{ fontSize: '24px' }} />;
        case 'error':
            return <CloseCircleTwoTone twoToneColor='red' style={{ fontSize: '24px' }} />;
        default:
            return <CloseCircleTwoTone twoToneColor='#2f54eb' style={{ fontSize: '24px' }} />;
    }
};

type ErrorShowAllowedTrainsListPropsType = {
    status?: StatusMessageType;
    closeClickAction?: () => void;
    buttonActionClick?: () => void;
};

export const ErrorShowAllowedTrainsList: FC<ErrorShowAllowedTrainsListPropsType> = ({
    status,
    closeClickAction,
    buttonActionClick,
}) => {
    const title = 'При открытии данных произошла ошибка';
    const subtitle = 'Попробуйте ещё раз.';
    const buttonText = 'Обновить';

    const handleCloseButtonClick = () => {
        if (closeClickAction) closeClickAction();
    };

    const handleActionButtonClick = () => {
        if (buttonActionClick) buttonActionClick();
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.main}>
                <div className={classes.status}>{getIconFromStatus(status)}</div>
                <div className={classes.content}>
                    <div data-test-id='modal-error-user-training-title' className={classes.title}>
                        {title}
                    </div>
                    <div
                        data-test-id='modal-error-user-training-subtitle'
                        className={classes.subtitle}
                    >
                        {subtitle}
                    </div>
                </div>
                <div className={classes.close}>
                    <Button
                        data-test-id='modal-error-user-training-button-close'
                        onClick={handleCloseButtonClick}
                        icon={<CloseOutlined style={{ fontSize: '14px' }} />}
                        shape='circle'
                        block={true}
                        style={{ border: 'none' }}
                    />
                </div>
            </div>
            <div className={classes.button}>
                <Button
                    data-test-id='modal-error-user-training-button'
                    type='primary'
                    htmlType='button'
                    onClick={handleActionButtonClick}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};
