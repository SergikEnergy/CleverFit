import { FC } from 'react';
import { Button, Result } from 'antd';

import { useModalReportContext } from '../../react-contexts';

import classes from './add-feedback-success.module.css';

export const AddFeedbackSuccess: FC = () => {
    const { closeModal, setNode } = useModalReportContext();
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
                        block={true}
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
