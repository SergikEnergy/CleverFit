import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLogin } from '@components/form-login';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import { Paths } from '../../../routes/pathes';
import { MainFormsLayout } from '../main-forms-layout';

import classes from './login-page.module.css';

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            navigate(Paths.MAIN_PAGE, { replace: true });
        }
    }, [token, navigate]);

    return (
        <div className={classes.login}>
            <div className={classes.wrapper}>
                <MainFormsLayout setActiveLogin={true} />
                <FormLogin />
            </div>
        </div>
    );
};
