import { FC } from 'react';
import { history } from '@redux/configure-store';
import { useLocation } from 'react-router-dom';
import { Paths } from '../../../routes/pathes';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

export const ErrorChangePasswordPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH_CHANGE_PASS, { fromPath: location.pathname });
    };

    const title = 'Данные не сохранились';
    const subTitle = 'Что-то пошло не так. Попробуйте еще раз.';
    const buttonText = 'Повторить';
    const status = 'error';
    const buttonKey = 'error change password';
    return (
        <ResultsWrapper>
            <Result
                status={status}
                title={title}
                subTitle={subTitle}
                extra={
                    <Button
                        data-test-id='change-retry-button'
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
