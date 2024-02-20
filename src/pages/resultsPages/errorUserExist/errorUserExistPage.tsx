import { FC } from 'react';

import { Button, Result } from 'antd';
import classes from './ErrorUserExistPage.module.css';

export const ErrorUserExistPage: FC = () => {
    const title = 'Данные не сохранились';
    const subTitle =
        'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.';

    return (
        <div className={classes.errorsUserExist}>
            <Result
                status='error'
                title={title}
                subTitle={subTitle}
                extra={
                    <Button
                        size='large'
                        type='primary'
                        block
                        key='user alreadu exist auth'
                        htmlType='button'
                    >
                        Назад к регистрации
                    </Button>
                }
            />
        </div>
    );
};
