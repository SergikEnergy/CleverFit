import { FC, useContext } from 'react';
import { Button, Result } from 'antd';
import { ModalFeedbackContext } from '../../reactContexts/modalFeedback-context';

import classes from './AddFeedbackSuccess.module.css';

export const AddFeedbackSuccess: FC = () => {
    const { closeModal, setNode } = useContext(ModalFeedbackContext);
    const handleClickButton = () => {
        closeModal();
        setNode(null);
    };

    const title = 'Отзыв успешно опубликован';
    const buttonText = 'Отлично';
    const status = 'success';
    const buttonKey = 'success add feedback';

    return (
        <div className={classes.result}>
            <Result
                className={classes.success}
                status={status}
                title={title}
                extra={
                    <Button
                        color='#2f54eb'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        block
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
