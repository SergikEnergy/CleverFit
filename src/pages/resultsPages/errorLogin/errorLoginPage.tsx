import { FC } from 'react';
import { Paths } from '../../../routes/pathes';
import { history } from '@redux/configure-store';
import { useLocation } from 'react-router-dom';

import { ResultsWrapper } from '@view/resultsWrapper';
import { Button, Result } from 'antd';

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
