import { FC, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SettingsHeader } from '@components/settings-header';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BasePagesLayout } from '@pages/base-pages-layout';

import { Paths } from '../../routes/pathes';

export const SettingsPage: FC = () => {
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);

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
            <SettingsHeader />
        </BasePagesLayout>
    );
};
