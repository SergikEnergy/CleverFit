import { FC } from 'react';
import { Paths } from '../../../routes/pathes';
import { history } from '@redux/configure-store';
import { useLocation } from 'react-router-dom';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

export const ErrorCheckNoExistEmailPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH, { fromPath: location.pathname });
    };

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
                    <Button
                        data-test-id='check-retry-button'
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
