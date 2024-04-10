import { FC } from 'react';
import { useLocation } from 'react-router';
import { CloseOutlined } from '@ant-design/icons';
import { useGetAllowedTrainingsLists } from '@hooks/use-get-allowed-trainings-list';
import { getIconFromStatus, StatusMessageType } from '@utils/get-icon-from-status';
import { Button } from 'antd';

import { WORKOUT_DATA_TEST_ID } from '../../data/data-test-ids';
import { useModalReportContext } from '../../react-contexts';

import classes from './error-show-allowed-trains-list.module.css';

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
    const location = useLocation();
    const { fetchAllowedTrainingsList } = useGetAllowedTrainingsLists();
    const { closeModal, setNode } = useModalReportContext();
    const isFromCalendarPage = location.pathname.includes('calendar');
    const title = 'При открытии данных произошла ошибка';
    const subtitle = 'Попробуйте ещё раз.';
    const buttonText = 'Обновить';

    const handleCloseButtonClick = () => {
        if (closeClickAction) closeClickAction();
    };

    const handleActionButtonClick = () => {
        if (buttonActionClick) buttonActionClick();
        else if (isFromCalendarPage) {
            setNode(null);
            closeModal();
            if (fetchAllowedTrainingsList) fetchAllowedTrainingsList();
        }
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
                        data-test-id={WORKOUT_DATA_TEST_ID.modalErrorUserTrainingButtonClose}
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
                    data-test-id={WORKOUT_DATA_TEST_ID.modalErrorUserTrainingButton}
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
