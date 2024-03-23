import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

import classes from './error-check-email-page.module.css';

export const ErrorCheckEmailPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH, { fromPath: location.pathname });
    };

    const title = 'Что-то пошло не так';
    const subTitle = 'Произошла ошибка, попробуйте отправить форму ещё раз.';
    const buttonText = 'Назад';
    const status = '500';
    const buttonKey = 'error500 e-mail auth';

    return (
        <div className={classes.statuses}>
            <Result
                status={status}
                title={title}
                subTitle={subTitle}
                extra={
                    <Button
                        data-test-id='check-back-button'
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
