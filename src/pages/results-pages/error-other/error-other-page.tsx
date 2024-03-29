import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { ResultsWrapper } from '@view/results-wrapper';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

export const ErrorOtherPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH_REGISTRATION, { fromPath: location.pathname });
    };

    const title = 'Данные не сохранились';
    const subTitle =
        'Что-то пошло не так и ваша регистрация не\u00A0завершилась. Попробуйте ещё раз.';
    const buttonText = 'Повторить';
    const status = 'error';
    const buttonKey = 'get other error auth';

    return (
        <ResultsWrapper>
            <Result
                status={status}
                title={title}
                subTitle={subTitle}
                extra={
                    <Button
                        data-test-id='registration-retry-button'
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
