import { FC } from 'react';
import { NewFeedback } from '@components/new-feedback';
import { ADD_FEEDBACK_ERROR_MESSAGES } from '@utils/constants/errors-messages';
import { Button, Result } from 'antd';

import { useModalReportContext } from '../../react-contexts';

import classes from './add-feedback-error.module.css';

export const AddFeedbackError: FC = () => {
    const { closeModal, setNode, openModal, setWidthModal } = useModalReportContext();
    const handleClickButtonWrite = () => {
        closeModal();
        setNode(<NewFeedback />);
        setWidthModal('clamp(328px, 100%, 539px)');
        openModal();
    };

    const handleClickButtonClose = () => {
        closeModal();
        setNode(null);
    };

    return (
        <div className={classes.result}>
            <Result
                className={classes.error}
                status={ADD_FEEDBACK_ERROR_MESSAGES.status}
                title={ADD_FEEDBACK_ERROR_MESSAGES.title}
                subTitle={ADD_FEEDBACK_ERROR_MESSAGES.subTitle}
                extra={[
                    <Button
                        data-test-id='write-review-not-saved-modal'
                        className={classes.writeButton}
                        color='#2f54eb'
                        onClick={handleClickButtonWrite}
                        size='large'
                        type='primary'
                        block={true}
                        key='error write'
                        htmlType='button'
                    >
                        Написать отзыв
                    </Button>,
                    <Button
                        onClick={handleClickButtonClose}
                        size='large'
                        block={true}
                        key='error close'
                        htmlType='button'
                    >
                        Закрыть
                    </Button>,
                ]}
            />
        </div>
    );
};
