import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '../../../routes/pathes';

import { FormRegistration } from '@components/formRegistration';
import { MainFormsLayout } from '../main-forms-layout';
import classes from './registerPage.module.css';

export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);
    useEffect(() => {
        if (token) {
            navigate(Paths.MAIN_PAGE, { replace: true });
        }
    }, []);

    return (
        <div className={classes.register}>
            <div className={classes.wrapper}>
                <MainFormsLayout setActiveLogin={false} />
                <FormRegistration />
            </div>
        </div>
    );
};
