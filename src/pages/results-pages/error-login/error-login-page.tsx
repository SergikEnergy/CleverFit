import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { ResultsWrapper } from '@view/results-wrapper';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

export const ErrorLoginPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH, { fromPath: location.pathname });
    };

    const title = 'Вход не выполнен';
    const subTitle = 'Что-то пошло не так. Попробуйте еще раз';
    const buttonText = 'Повторить';
    const status = 'warning';
    const buttonKey = 'failed auth';

    return (
        <ResultsWrapper>
            <Result
                status={status}
                title={title}
                subTitle={subTitle}
                extra={
                    <Button
                        data-test-id='login-retry-button'
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
