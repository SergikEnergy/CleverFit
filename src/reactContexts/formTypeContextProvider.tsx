import { FC, useState, ReactNode } from 'react';
import { FormTypeContext, AllowedTypeForm } from './formType-context';

export const FormTypeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [typeForm, setTypeForm] = useState<AllowedTypeForm>('login');

    const changeTypeForm = () => {
        setTypeForm((prev) => (prev === 'login' ? 'signUp' : 'login'));
    };

    return (
        <FormTypeContext.Provider value={{ type: typeForm, changeType: changeTypeForm }}>
            {children}
        </FormTypeContext.Provider>
    );
};
