import { FC } from 'react';

import { Button, Result } from 'antd';
import classes from './errorLoginPage.module.css';

export const ErrorLoginPage: FC = () => {
    const title = 'Вход не выполнен';
    const subTitle = 'Что-то пошло не так. Попробуйте еще раз';

    return (
        <div className={classes.errorsLogin}>
            <Result
                status='warning'
                title={title}
                subTitle={subTitle}
                extra={
                    <Button size='large' type='primary' block key='failed auth' htmlType='button'>
                        Повторить
                    </Button>
                }
            />
        </div>
    );
};
