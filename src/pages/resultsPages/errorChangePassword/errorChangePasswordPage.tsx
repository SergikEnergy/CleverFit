import { FC } from 'react';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

export const ErrorChangePasswordPage: FC = () => {
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
                    <Button size='large' type='primary' block key={buttonKey} htmlType='button'>
                        {buttonText}
                    </Button>
                }
            />
        </ResultsWrapper>
    );
};
