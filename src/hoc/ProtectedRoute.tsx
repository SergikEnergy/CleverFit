import { FC, ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { isAllowedPreviousLocation } from '../helpers/isAllowedPreviousLocation';
import { Paths } from '../routes/pathes';

type ProtectedRoutePropsType = {
    children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRoutePropsType> = ({ children }) => {
    const location = useLocation();
    const isRightPath = isAllowedPreviousLocation(location);

    if (isRightPath) {
        return children;
    } else {
        return <Navigate to={Paths.AUTH} replace />;
    }
};
