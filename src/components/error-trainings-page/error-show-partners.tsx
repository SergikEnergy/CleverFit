import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useGetRandomPartners } from '@hooks/use-get-random-partners';
import { useGetSimilarPartners } from '@hooks/use-get-similar-partners';
import { usePartnersSelector } from '@redux/selectors';
import { ERROR_MODAL_WITHOUT_UPDATE } from '@utils/constants/errors-messages';
import { getIconFromStatus, StatusMessageType } from '@utils/get-icon-from-status';
import { Button } from 'antd';

import { WORKOUT_DATA_TEST_ID } from '../../data/data-test-ids';
import { useModalReportContext } from '../../react-contexts';

import classes from './error-show-partners.module.css';

type ErrorShowPartnersPropsType = {
    status?: StatusMessageType;
    closeClickAction?: () => void;
    buttonActionClick?: () => void;
    random?: boolean;
};

export const ErrorShowPartners: FC<ErrorShowPartnersPropsType> = ({
    status,
    closeClickAction,
    buttonActionClick,
    random = false,
}) => {
    const { closeModal, setNode } = useModalReportContext();
    const { trainingType } = usePartnersSelector();
    const fetchRandomPartners = useGetRandomPartners();
    const fetchSimilarPartners = useGetSimilarPartners();

    const handleCloseButtonClick = () => {
        if (closeClickAction) closeClickAction();
    };

    const handleActionButtonClick = () => {
        if (buttonActionClick) buttonActionClick();
        if (random) {
            fetchRandomPartners();
        }
        if (!random && trainingType) {
            fetchSimilarPartners({ trainingType });
        }

        setNode(null);
        closeModal();
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.main}>
                <div className={classes.status}>{getIconFromStatus(status)}</div>
                <div className={classes.content}>
                    <div data-test-id='modal-error-user-training-title' className={classes.title}>
                        {ERROR_MODAL_WITHOUT_UPDATE.title}
                    </div>
                    <div
                        data-test-id='modal-error-user-training-subtitle'
                        className={classes.subtitle}
                    >
                        {ERROR_MODAL_WITHOUT_UPDATE.subTitle}
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
                    {ERROR_MODAL_WITHOUT_UPDATE.buttonText}
                </Button>
            </div>
        </div>
    );
};
