import { FC, Fragment, useEffect, useLayoutEffect } from 'react';
import { HistoryRouter } from 'redux-first-history/rr6';
import { LoaderAuth } from '@components/loader';
import { useLazyGetUserInfoQuery } from '@redux/api/profile-api';
import { history } from '@redux/configure-store';
import { savePersonalInfoAfterRegistration } from '@redux/reducers/personal-info-slice';
import { useAuthSelector } from '@redux/selectors';

import { routes } from './routes/routes';
import { useAppDispatch } from './hooks';
import { useLoaderContext } from './react-contexts';

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { token } = useAuthSelector();
    const { isLoading } = useLoaderContext();

    const [fetchUserInfo, { data: userPersonalInfo, isSuccess: isSuccessGetUserInfo }] =
        useLazyGetUserInfoQuery();

    useLayoutEffect(() => {
        if (!userPersonalInfo && token) {
            fetchUserInfo();
        }
    }, [fetchUserInfo, userPersonalInfo, token]);

    useEffect(() => {
        if (userPersonalInfo && isSuccessGetUserInfo) {
            dispatch(savePersonalInfoAfterRegistration(userPersonalInfo));
        }
    }, [dispatch, isSuccessGetUserInfo, userPersonalInfo]);

    return (
        <Fragment>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
            {isLoading && <LoaderAuth />}
        </Fragment>
    );
};
