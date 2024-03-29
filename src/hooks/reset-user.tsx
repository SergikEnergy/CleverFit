import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/api/api-data';
import { resetCredentials } from '@redux/reducers/auth-slice';

import { Paths } from '../routes/pathes';

import { useAppDispatch } from '.';

export const useResetUser = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const resetUser = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
        dispatch(resetCredentials());
        navigate(Paths.AUTH, { replace: true });
    }, [dispatch, navigate]);

    return resetUser;
};
