import { FC, useContext } from 'react';
import { Button, Result } from 'antd';
import { ModalFeedbackContext } from '../../reactContexts/modalFeedback-context';

import classes from './ShowFeedback.module.css';

export const ShowFeedbackError: FC = () => {
    const { closeModal, setNode } = useContext(ModalFeedbackContext);
    const handleClickButton = () => {
        closeModal();
        setNode(null);
    };

    const title = 'Что-то пошло не так';
    const subtitle = 'Произошла ошибка, попробуйте ещё раз.';
    const buttonText = 'Назад';
    const status = '500';
    const buttonKey = 'error get feedback';

    return (
        <div className={classes.result}>
            <Result
                className={classes.error}
                status={status}
                title={title}
                subTitle={subtitle}
                extra={
                    <Button
                        color='#2f54eb'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        key={buttonKey}
                        htmlType='button'
                    >
                        {buttonText}
                    </Button>
                }
            />
        </div>
    );
};
