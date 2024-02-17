import { FC } from 'react';

import { FormRegistration } from '@components/formRegistration';
import { MainFormsLayout } from '../main-forms-layout';
import classes from './registerPage.module.css';

export const RegisterPage: FC = () => {
    return (
        <div className={classes.register}>
            <div className={classes.wrapper}>
                <MainFormsLayout setActiveLogin={false} />
                <FormRegistration />
            </div>
        </div>
    );
};
