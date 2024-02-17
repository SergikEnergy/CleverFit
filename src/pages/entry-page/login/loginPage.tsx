import { FC } from 'react';

import classes from './loginPage.module.css';
import { MainFormsLayout } from '../main-forms-layout';
import { FormLogin } from '@components/formLogin';

export const LoginPage: FC = () => {
    return (
        <div className={classes.login}>
            <div className={classes.wrapper}>
                <MainFormsLayout setActiveLogin={true} />
                <FormLogin />
            </div>
        </div>
    );
};
