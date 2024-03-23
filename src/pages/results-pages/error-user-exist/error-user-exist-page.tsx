import { FC } from 'react';
import { history } from '@redux/configure-store';
import { ResultsWrapper } from '@view/results-wrapper';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

export const ErrorUserExistPage: FC = () => {
    const handleClickButton = () => {
        history.push(Paths.AUTH_REGISTRATION);
    };

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
                    <Button
                        data-test-id='registration-back-button'
                        size='large'
                        type='primary'
                        block={true}
                        key={buttonKey}
                        htmlType='button'
                        onClick={handleClickButton}
                    >
                        {buttonText}
                    </Button>
                }
            />
        </ResultsWrapper>
    );
};
