import { FC } from 'react';
import { history } from '@redux/configure-store';
import { ResultsWrapper } from '@view/results-wrapper';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

export const SuccessChangePasswordPage: FC = () => {
    const handleClickButton = () => {
        history.push(Paths.AUTH);
    };

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
                    <Button
                        data-test-id='change-entry-button'
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
        </ResultsWrapper>
    );
};
