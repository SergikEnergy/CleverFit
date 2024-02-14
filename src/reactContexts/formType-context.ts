import { createContext } from 'react';

export type AllowedTypeForm = 'login' | 'signUp';

export type FormContextType = {
    type: AllowedTypeForm;
    changeType: () => void;
};

export const FormTypeContext = createContext<FormContextType>({
    type: 'login',
    changeType: () => {
        return;
    },
});
