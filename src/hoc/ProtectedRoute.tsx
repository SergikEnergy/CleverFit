import { FC, ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { isAllowedPreviousLocation } from '../helpers/isAllowedPreviousLocation';
import { Paths } from '../routes/pathes';

interface ProtectedRouteProps {
    children: ReactNode;
    forPassword?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, forPassword }) => {
    const location = useLocation();
    const isRightPath = isAllowedPreviousLocation(location, forPassword);

    if (isRightPath) {
        return children;
    } else {
        return <Navigate to={Paths.AUTH} replace />;
    }
};
