import { FC } from 'react';
import { Paths } from '../../../routes/pathes';
import { history } from '@redux/configure-store';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

export const SuccessRegisterPage: FC = () => {
    const handleClickButton = () => {
        history.push(Paths.AUTH);
    };

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
                    <Button
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        block
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
