import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/api/api-data';
import { setCredentials } from '@redux/reducers/auth-slice';
import { setEntryPoint } from '@redux/reducers/personal-info-slice';

import { Paths } from '../../routes/pathes';

export const DummyRootElement: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('accessToken');

        if (token) {
            localStorage.setItem(LOCAL_STORAGE_AUTH_PARAM, JSON.stringify({ email: '', token }));
            dispatch(setCredentials({ email: '', password: '', token, rememberMe: true }));
            dispatch(setEntryPoint('google'));
            navigate(Paths.MAIN_PAGE, { replace: true });
        } else {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [dispatch, location.search, navigate]);

    return <div />;
};
