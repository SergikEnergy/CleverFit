import { FC, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Footer } from '@components/footer';
import { MainContent } from '@components/main-content';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useGetUserInfoQuery } from '@redux/api/profile-api';
import { savePersonalInfoAfterRegistration } from '@redux/reducers/personal-info-slice';
import { Layout as AntLayout } from 'antd';

import { CollapsedContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import './main-page.css';

const { Footer: AntFooter } = AntLayout;

export const MainPage: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const { data: userPersonalInfo } = useGetUserInfoQuery();

    useEffect(() => {
        if (userPersonalInfo) {
            dispatch(savePersonalInfoAfterRegistration(userPersonalInfo));
        }
    }, [dispatch, userPersonalInfo]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    if (!token) {
        return <Navigate to={Paths.AUTH} replace={true} />;
    }

    return (
        <BasePagesLayout>
            <MainContent />
            <AntFooter
                className={collapsed ? 'footer collapsed' : 'footer'}
                style={{ padding: 0, background: 'transparent' }}
            >
                <Footer />
            </AntFooter>
        </BasePagesLayout>
    );
};
