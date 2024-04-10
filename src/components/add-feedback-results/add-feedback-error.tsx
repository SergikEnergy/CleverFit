import { FC } from 'react';
import { NewFeedback } from '@components/new-feedback';
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
    const title = 'Данные не сохранились';
    const subtitle = 'Что-то пошло не так. Попробуйте ещё раз.';
    const buttonTexts = ['Написать отзыв', 'Закрыть'];
    const status = 'error';
    const buttonKeys = ['error write', 'error close'];

    return (
        <div className={classes.result}>
            <Result
                className={classes.error}
                status={status}
                title={title}
                subTitle={subtitle}
                extra={[
                    <Button
                        data-test-id='write-review-not-saved-modal'
                        className={classes.writeButton}
                        color='#2f54eb'
                        onClick={handleClickButtonWrite}
                        size='large'
                        type='primary'
                        block={true}
                        key={buttonKeys[0]}
                        htmlType='button'
                    >
                        {buttonTexts[0]}
                    </Button>,
                    <Button
                        onClick={handleClickButtonClose}
                        size='large'
                        block={true}
                        key={buttonKeys[1]}
                        htmlType='button'
                    >
                        {buttonTexts[1]}
                    </Button>,
                ]}
            />
        </div>
    );
};
