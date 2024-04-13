import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { ERROR_CHECK_EMAIL_MESSAGES } from '@utils/constants/errors-messages';
import { Button, Result } from 'antd';

import { Paths } from '../../../routes/pathes';

import classes from './error-check-email-page.module.css';

export const ErrorCheckEmailPage: FC = () => {
    const location = useLocation();
    const handleClickButton = () => {
        history.push(Paths.AUTH, { fromPath: location.pathname });
    };

    return (
        <div className={classes.statuses}>
            <Result
                status={ERROR_CHECK_EMAIL_MESSAGES.status}
                title={ERROR_CHECK_EMAIL_MESSAGES.title}
                subTitle={ERROR_CHECK_EMAIL_MESSAGES.subTitle}
                extra={
                    <Button
                        data-test-id='check-back-button'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        key={ERROR_CHECK_EMAIL_MESSAGES.buttonKey}
                        htmlType='button'
                    >
                        {ERROR_CHECK_EMAIL_MESSAGES.buttonText}
                    </Button>
                }
            />
        </div>
    );
};
