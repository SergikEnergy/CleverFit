import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormRegistration } from '@components/form-registration';
import { useAuthSelector } from '@redux/selectors';

import { Paths } from '../../../routes/pathes';
import { MainFormsLayout } from '../main-forms-layout';

import classes from './register-page.module.css';

export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const { token } = useAuthSelector();

    useEffect(() => {
        if (token) {
            navigate(Paths.MAIN_PAGE, { replace: true });
        }
    }, [navigate, token]);

    return (
        <div className={classes.register}>
            <div className={classes.wrapper}>
                <MainFormsLayout setActiveLogin={false} />
                <FormRegistration />
            </div>
        </div>
    );
};
