import { FC, Fragment, useContext, useEffect, useLayoutEffect } from 'react';
import { HistoryRouter } from 'redux-first-history/rr6';
import { LoaderAuth } from '@components/loader';
import { useLazyGetUserInfoQuery } from '@redux/api/profile-api';
import { history } from '@redux/configure-store';
import { savePersonalInfoAfterRegistration } from '@redux/reducers/personal-info-slice';

import { routes } from './routes/routes';
import { useAppDispatch, useAppSelector } from './hooks';
import { LoaderStateContext } from './react-contexts';

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const { isLoading } = useContext(LoaderStateContext);
    const [fetchUserInfo, { data: userPersonalInfo, isSuccess: isSuccessGetUserInfo }] =
        useLazyGetUserInfoQuery();

    useLayoutEffect(() => {
        if (!userPersonalInfo && token) {
            fetchUserInfo();
        }
    }, [fetchUserInfo, userPersonalInfo, token]);

    useEffect(() => {
        if (userPersonalInfo && isSuccessGetUserInfo) {
            dispatch(savePersonalInfoAfterRegistration({ ...userPersonalInfo, url: '', name: '' }));
        }
    }, [dispatch, isSuccessGetUserInfo, userPersonalInfo]);

    return (
        <Fragment>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
            {isLoading && <LoaderAuth />}
        </Fragment>
    );
};
