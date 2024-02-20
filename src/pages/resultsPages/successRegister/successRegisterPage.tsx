import { FC } from 'react';

import { Button, Result } from 'antd';
import classes from './successRegisterPage.module.css';

export const SuccessRegisterPage: FC = () => {
    const title = 'Регистрация успешна';
    const subTitle =
        'Регистрация прошла успешно. Зайдите в\u00A0приложение, используя свои e-mail и пароль.';

    return (
        <div className={classes.successLogin}>
            <Result
                status='success'
                title={title}
                subTitle={subTitle}
                extra={
                    <Button size='large' type='primary' block key='success auth' htmlType='button'>
                        Войти
                    </Button>
                }
            />
        </div>
    );
};
