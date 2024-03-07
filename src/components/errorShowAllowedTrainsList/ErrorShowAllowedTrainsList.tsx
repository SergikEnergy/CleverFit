import { FC } from 'react';
import { Button } from 'antd';
import { CloseCircleTwoTone, CloseOutlined } from '@ant-design/icons';

import classes from './ErrorShowAllowedTrainsList.module.css';

type StatusMessageType = 'success' | 'error' | 'info';

const getIconFromStatus = (status: StatusMessageType = 'error') => {
    switch (status) {
        case 'success':
            return <CloseCircleTwoTone style={{ fontSize: '24px' }} />;
        case 'error':
            return <CloseCircleTwoTone twoToneColor={'red'} style={{ fontSize: '24px' }} />;
        default:
            return <CloseCircleTwoTone twoToneColor={'#2f54eb'} style={{ fontSize: '24px' }} />;
    }
};

interface IErrorShowAllowedTrainsListProps {
    status?: StatusMessageType;
    closeClickAction?: () => void;
    buttonActionClick?: () => void;
}

export const ErrorShowAllowedTrainsList: FC<IErrorShowAllowedTrainsListProps> = ({
    status,
    closeClickAction,
    buttonActionClick,
}) => {
    const title = 'При открытии данных произошла ошибка';
    const subtitle = 'Попробуйте еще раз.';
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
                    <div className={classes.title}>{title}</div>
                    <div className={classes.subtitle}>{subtitle}</div>
                </div>
                <div className={classes.close}>
                    <Button
                        onClick={handleCloseButtonClick}
                        icon={<CloseOutlined style={{ fontSize: '14px' }} />}
                        shape='circle'
                        style={{ border: 'none' }}
                    />
                </div>
            </div>
            <div className={classes.button}>
                <Button type='primary' htmlType='button' onClick={handleActionButtonClick}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};
