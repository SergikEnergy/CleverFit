import { FC, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { NotFoundResult } from '@components/not-found-result';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BasePagesLayout } from '@pages/base-pages-layout';

import { Paths } from '../../routes/pathes';

type NotFoundPagePropsType = {
    //
};

export const NotFoundPage: FC<NotFoundPagePropsType> = () => {
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
            <NotFoundResult />
        </BasePagesLayout>
    );
};
