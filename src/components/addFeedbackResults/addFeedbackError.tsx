import { FC, useContext } from 'react';
import { Button, Result } from 'antd';
import { ModalFeedbackContext } from '../../reactContexts/modalFeedback-context';
import { NewFeedback } from '@components/newFeedback';

import classes from './addFeedbackError.module.css';

export const AddFeedbackError: FC = () => {
    const { closeModal, setNode, openModal, setWidthModal } = useContext(ModalFeedbackContext);
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
                        className={classes.writeButton}
                        color='#2f54eb'
                        onClick={handleClickButtonWrite}
                        size='large'
                        type='primary'
                        block
                        key={buttonKeys[0]}
                        htmlType='button'
                    >
                        {buttonTexts[0]}
                    </Button>,
                    <Button
                        onClick={handleClickButtonClose}
                        size='large'
                        block
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
