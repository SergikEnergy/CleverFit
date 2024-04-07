import { FC, Fragment, useEffect, useLayoutEffect } from 'react';
import { HistoryRouter } from 'redux-first-history/rr6';
import { LoaderAuth } from '@components/loader';
import { useLazyGetAllInvitationsQuery } from '@redux/api/invitations-api';
import { useLazyGetUserInfoQuery } from '@redux/api/profile-api';
import { history } from '@redux/configure-store';
import { savePersonalInfoAfterRegistration } from '@redux/reducers/personal-info-slice';
import { setUserInvitations } from '@redux/reducers/user-invitations-slice';
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

    const [fetchUserInvitations, { data: userInvitations, isSuccess: isFetchedInvitations }] =
        useLazyGetAllInvitationsQuery();

    useLayoutEffect(() => {
        if (!userPersonalInfo && token) {
            fetchUserInfo();
        }
    }, [fetchUserInfo, userPersonalInfo, token]);

    useLayoutEffect(() => {
        if (!userInvitations && token) {
            fetchUserInvitations();
        }
    }, [fetchUserInvitations, userInvitations, token]);

    useEffect(() => {
        if (userPersonalInfo && isSuccessGetUserInfo) {
            dispatch(savePersonalInfoAfterRegistration(userPersonalInfo));
        }
    }, [dispatch, isSuccessGetUserInfo, userPersonalInfo]);

    useEffect(() => {
        if (userInvitations && isFetchedInvitations) {
            dispatch(setUserInvitations(userInvitations));
        }
    }, [dispatch, isFetchedInvitations, userInvitations]);

    return (
        <Fragment>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
            {isLoading && <LoaderAuth />}
        </Fragment>
    );
};
