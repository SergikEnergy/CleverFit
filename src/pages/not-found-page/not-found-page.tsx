import { FC, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { NotFoundResult } from '@components/not-found-result';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useAuthSelector } from '@redux/selectors';

import { Paths } from '../../routes/pathes';

export const NotFoundPage: FC = () => {
    const navigate = useNavigate();
    const { token } = useAuthSelector();

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
            <NotFoundResult />
        </BasePagesLayout>
    );
};
