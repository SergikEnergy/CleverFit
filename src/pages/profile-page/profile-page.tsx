import { FC, useEffect, useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ProfileContent } from '@components/profile-content';
import { ProfileHeader } from '@components/profile-header';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useGetUserInfoQuery } from '@redux/api/profile-api';
import { savePersonalInfoAfterRegistration } from '@redux/reducers/personal-info-slice';

import { Paths } from '../../routes/pathes';

export const ProfilePage: FC = () => {
    const isUserData = useAppSelector((state) => !!state.personalInfo.email);
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const { data: userPersonalInfo } = useGetUserInfoQuery();

    useLayoutEffect(() => {
        if (!isUserData && userPersonalInfo) {
            dispatch(savePersonalInfoAfterRegistration(userPersonalInfo));
        }
    }, [dispatch, userPersonalInfo, isUserData]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    if (!token) {
        return <Navigate to={Paths.AUTH} replace={true} />;
    }

    return (
        <BasePagesLayout customHeader={true}>
            <ProfileHeader />
            <ProfileContent />
        </BasePagesLayout>
    );
};
