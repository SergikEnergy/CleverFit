import { FC } from 'react';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

export const ErrorOtherPage: FC = () => {
    const title = 'Данные не сохранились';
    const subTitle =
        'Что-то пошло не так и ваша регистрация не\u00A0завершилась. Попробуйте ещё раз.';
    const buttonText = 'Повторить';
    const status = 'error';
    const buttonKey = 'get other error auth';
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
