import { Location } from 'react-router-dom';
import { Paths } from '../routes/pathes';

const passwordRebootFlowPaths: Record<string, string | undefined> = {
    [Paths.AUTH]: Paths.AUTH_CONFIRM_EMAIL,
    [Paths.AUTH_CONFIRM_EMAIL]: Paths.AUTH_CHANGE_PASS,
};

export const isAllowedPreviousLocation = (location: Location, isRebootPasswordFlow = false) => {
    if (!isRebootPasswordFlow) {
        switch (location.state?.fromPath) {
            case Paths.AUTH:
                return true;
            case Paths.AUTH_REGISTRATION:
                return true;
            default:
                return false;
        }
    } else {
        if (passwordRebootFlowPaths[location.state?.fromPath] === location.pathname) {
            return true;
        } else return false;
    }
};
