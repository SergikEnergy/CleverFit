/* eslint-disable unicorn/filename-case */
import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isAllowedPreviousLocation } from '../helpers/is-allowed-previous-location';
import { Paths } from '../routes/pathes';

type ProtectedRoutePropsType = {
    children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRoutePropsType> = ({ children }) => {
    const location = useLocation();
    const isRightPath = isAllowedPreviousLocation(location);

    if (isRightPath) {
        return children;
    }

    return <Navigate to={Paths.AUTH} replace={true} />;
};
