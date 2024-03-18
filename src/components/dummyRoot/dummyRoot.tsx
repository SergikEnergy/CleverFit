import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setCredentials } from '@redux/reducers/authSlice';
import { Paths } from '../../routes/pathes';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';

export const DummyRootElement: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('accessToken');
        if (token) {
            localStorage.setItem(LOCAL_STORAGE_AUTH_PARAM, JSON.stringify({ email: '', token }));
            dispatch(setCredentials({ email: '', password: '', token, rememberMe: true }));
            navigate(Paths.MAIN_PAGE, { replace: true });
        } else {
            navigate(Paths.AUTH, { replace: true });
        }
    }, []);
    return <></>;
};
