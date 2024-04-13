import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { ERROR_OTHER_SIGN_MESSAGES } from '@utils/constants/errors-messages';
import { ResultsWrapper } from '@view/results-wrapper';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

export const ErrorOtherPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH_REGISTRATION, { fromPath: location.pathname });
    };

    return (
        <ResultsWrapper>
            <Result
                status={ERROR_OTHER_SIGN_MESSAGES.status}
                title={ERROR_OTHER_SIGN_MESSAGES.title}
                subTitle={ERROR_OTHER_SIGN_MESSAGES.subTitle}
                extra={
                    <Button
                        data-test-id='registration-retry-button'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        block={true}
                        key={ERROR_OTHER_SIGN_MESSAGES.buttonKey}
                        htmlType='button'
                    >
                        {ERROR_OTHER_SIGN_MESSAGES.buttonText}
                    </Button>
                }
            />
        </ResultsWrapper>
    );
};
