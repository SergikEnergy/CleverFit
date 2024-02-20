import { FC } from 'react';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

export const SuccessChangePasswordPage: FC = () => {
    const title = 'Пароль успешно изменен';
    const subTitle = 'Теперь можно войти в аккаунт, используя \nсвой логин и новый пароль';
    const buttonText = 'Вход';
    const status = 'success';
    const buttonKey = 'success change password';
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
