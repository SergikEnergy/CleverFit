import { FC, useContext } from 'react';
import { Button, Result } from 'antd';
import { ModalReportContext } from '../../reactContexts';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../routes/pathes';

import classes from './ShowFetchDataError.module.css';

interface IShowFetchDataErrorProps {
    forPage: 'calendar' | 'feedback';
}

export const ShowFetchDataError: FC<IShowFetchDataErrorProps> = ({ forPage }) => {
    const navigate = useNavigate();
    const { closeModal, setNode } = useContext(ModalReportContext);
    const handleClickButton = () => {
        closeModal();
        setNode(null);
        if (forPage !== 'calendar') {
            navigate(Paths.MAIN_PAGE, { replace: true });
        }
    };

    const title = 'Что-то пошло не так';
    const subtitle = 'Произошла ошибка, попробуйте ещё раз.';
    const buttonText = 'Назад';
    const status = '500';
    const buttonKey = 'error get feedback';

    return (
        <div className={classes.result} data-test-id='modal-no-review'>
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
