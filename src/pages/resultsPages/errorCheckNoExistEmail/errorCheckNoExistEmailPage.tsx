import { FC } from 'react';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

export const ErrorCheckNoExistEmailPage: FC = () => {
    const title = 'Данные не сохранились';
    const subTitle =
        'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.';
    const buttonText = 'Назад к регистрации';
    const status = 'error';
    const buttonKey = 'user already exist auth';
    return (
        <ResultsWrapper>
            <Result
                status={status}
                title={title}
                subTitle={subTitle}
                extra={
                    <Button size='large' type='primary' block key={buttonKey} htmlType='button'>
                        {buttonText}
                    </Button>
                }
            />
        </ResultsWrapper>
    );
};
