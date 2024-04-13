import { FC } from 'react';
import { history } from '@redux/configure-store';
import { ERROR_USER_EXIST_MESSAGES } from '@utils/constants/errors-messages';
import { ResultsWrapper } from '@view/results-wrapper';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

export const ErrorUserExistPage: FC = () => {
    const handleClickButton = () => {
        history.push(Paths.AUTH_REGISTRATION);
    };

    return (
        <ResultsWrapper>
            <Result
                status={ERROR_USER_EXIST_MESSAGES.status}
                title={ERROR_USER_EXIST_MESSAGES.title}
                subTitle={ERROR_USER_EXIST_MESSAGES.subTitle}
                extra={
                    <Button
                        data-test-id='registration-back-button'
                        size='large'
                        type='primary'
                        block={true}
                        key={ERROR_USER_EXIST_MESSAGES.buttonKey}
                        htmlType='button'
                        onClick={handleClickButton}
                    >
                        {ERROR_USER_EXIST_MESSAGES.buttonText}
                    </Button>
                }
            />
        </ResultsWrapper>
    );
};
