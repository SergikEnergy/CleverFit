import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { ERROR_LOGIN_MESSAGES } from '@utils/constants/errors-messages';
import { ResultsWrapper } from '@view/results-wrapper';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

export const ErrorLoginPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH, { fromPath: location.pathname });
    };

    return (
        <ResultsWrapper>
            <Result
                status={ERROR_LOGIN_MESSAGES.status}
                title={ERROR_LOGIN_MESSAGES.title}
                subTitle={ERROR_LOGIN_MESSAGES.subTitle}
                extra={
                    <Button
                        data-test-id='login-retry-button'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        block={true}
                        key={ERROR_LOGIN_MESSAGES.buttonKey}
                        htmlType='button'
                    >
                        {ERROR_LOGIN_MESSAGES.buttonText}
                    </Button>
                }
            />
        </ResultsWrapper>
    );
};
