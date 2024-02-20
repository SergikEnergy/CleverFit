import { FC } from 'react';

import { Button, Result } from 'antd';
import classes from './ErrorCheckEmailPage.module.css';

export const ErrorCheckEmailPage: FC = () => {
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
                    <Button size='large' type='primary' key={buttonKey} htmlType='button'>
                        {buttonText}
                    </Button>
                }
            />
        </div>
    );
};
