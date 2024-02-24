import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '../../../routes/pathes';

import classes from './loginPage.module.css';
import { MainFormsLayout } from '../main-forms-layout';
import { FormLogin } from '@components/formLogin';

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);
    useEffect(() => {
        if (token) {
            navigate(Paths.MAIN_PAGE, { replace: true });
        }
        console.log(token);
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
