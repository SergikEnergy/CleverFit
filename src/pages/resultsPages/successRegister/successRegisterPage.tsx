import { FC } from 'react';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

export const SuccessRegisterPage: FC = () => {
    const title = 'Регистрация успешна';
    const subTitle =
        'Регистрация прошла успешно. Зайдите в\u00A0приложение, используя свои e-mail и пароль.';
    const buttonText = 'Войти';
    const status = 'success';
    const buttonKey = 'success auth';
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
