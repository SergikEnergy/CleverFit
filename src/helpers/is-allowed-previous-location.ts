import { Location } from 'react-router-dom';

import { Paths } from '../routes/pathes';

type AllowedPathsType = {
    pathFrom: string;
    pathTo: string;
};

const allowedPaths: AllowedPathsType[] = [
    { pathFrom: Paths.AUTH, pathTo: Paths.AUTH_CONFIRM_EMAIL },
    { pathFrom: Paths.AUTH, pathTo: Paths.ERROR_CHECK_EMAIL },
    { pathFrom: Paths.AUTH, pathTo: Paths.ERROR_NO_EMAIL_AND_404 },
    { pathFrom: Paths.AUTH_CONFIRM_EMAIL, pathTo: Paths.AUTH_CHANGE_PASS },
    { pathFrom: Paths.AUTH_CHANGE_PASS, pathTo: Paths.ERROR_CHANGE_PASSWORD },
    { pathFrom: Paths.AUTH_CHANGE_PASS, pathTo: Paths.SUCCESS_CHANGE_PASSWORD },
    { pathFrom: Paths.ERROR_CHANGE_PASSWORD, pathTo: Paths.AUTH_CHANGE_PASS },
    { pathFrom: Paths.AUTH, pathTo: Paths.ERROR_LOGIN },
    { pathFrom: Paths.AUTH_REGISTRATION, pathTo: Paths.SUCCESS_REGISTRATION },
    { pathFrom: Paths.AUTH_REGISTRATION, pathTo: Paths.ERROR_NO_USER_409 },
    { pathFrom: Paths.AUTH_REGISTRATION, pathTo: Paths.ERROR_OTHERS },
];

export const isAllowedPreviousLocation = (location: Location) => {
    for (let i = 0; i < allowedPaths.length; i++) {
        if (
            location.state?.fromPath === allowedPaths[i].pathFrom &&
            location.pathname === allowedPaths[i].pathTo
        ) {
            return true;
        }
    }

    return false;
};
