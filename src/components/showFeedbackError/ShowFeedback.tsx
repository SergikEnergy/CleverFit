import { FC, useContext } from 'react';
import { Button, Result } from 'antd';
import { ModalReportContext } from '../../reactContexts/modalReport-context';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../routes/pathes';

import classes from './ShowFeedback.module.css';

export const ShowFeedbackError: FC = () => {
    const navigate = useNavigate();
    const { closeModal, setNode } = useContext(ModalReportContext);
    const handleClickButton = () => {
        closeModal();
        setNode(null);
        navigate(Paths.MAIN_PAGE, { replace: true });
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
