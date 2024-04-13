import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { ERROR_CHANGE_PASSWORD_MESSAGES } from '@utils/constants/errors-messages';
import { ResultsWrapper } from '@view/results-wrapper';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

export const ErrorChangePasswordPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH_CHANGE_PASS, { fromPath: location.pathname });
    };

    return (
        <ResultsWrapper>
            <Result
                status={ERROR_CHANGE_PASSWORD_MESSAGES.status}
                title={ERROR_CHANGE_PASSWORD_MESSAGES.title}
                subTitle={ERROR_CHANGE_PASSWORD_MESSAGES.subTitle}
                extra={
                    <Button
                        data-test-id='change-retry-button'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        block={true}
                        key={ERROR_CHANGE_PASSWORD_MESSAGES.buttonKey}
                        htmlType='button'
                    >
                        {ERROR_CHANGE_PASSWORD_MESSAGES.buttonText}
                    </Button>
                }
            />
        </ResultsWrapper>
    );
};
