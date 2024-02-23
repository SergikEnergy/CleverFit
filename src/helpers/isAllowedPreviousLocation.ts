import { Location } from 'react-router-dom';
import { Paths } from '../routes/pathes';

export const isAllowedPreviousLocation = (location: Location) => {
    switch (location.state?.fromPath) {
        case Paths.AUTH:
            return true;
        case Paths.AUTH_REGISTRATION:
            return true;
        default:
            return false;
    }
};
