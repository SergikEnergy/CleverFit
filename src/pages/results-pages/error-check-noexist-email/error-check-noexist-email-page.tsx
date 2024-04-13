import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { ERROR_CHECK_NO_EXIST_EMAIL } from '@utils/constants/errors-messages';
import { ResultsWrapper } from '@view/results-wrapper';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

export const ErrorCheckNoExistEmailPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH, { fromPath: location.pathname });
    };

    return (
        <ResultsWrapper>
            <Result
                status={ERROR_CHECK_NO_EXIST_EMAIL.status}
                title={ERROR_CHECK_NO_EXIST_EMAIL.title}
                subTitle={ERROR_CHECK_NO_EXIST_EMAIL.subTitle}
                extra={
                    <Button
                        data-test-id='check-retry-button'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        block={true}
                        key={ERROR_CHECK_NO_EXIST_EMAIL.buttonKey}
                        htmlType='button'
                    >
                        {ERROR_CHECK_NO_EXIST_EMAIL.buttonText}
                    </Button>
                }
            />
        </ResultsWrapper>
    );
};
