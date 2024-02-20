import { FC } from 'react';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

export const ErrorCheckNoExistEmailPage: FC = () => {
    const title = 'Такой e-mail не зарегистрирован';
    const subTitle = 'Мы не нашли в базе вашего e-mail. Попробуйте войти с\u00A0другим e-mail.';
    const buttonText = 'Попробовать снова';
    const status = 'error';
    const buttonKey = 'e-mail not found auth';
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
