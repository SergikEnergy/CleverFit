import { FC, Fragment, useContext } from 'react';
import { HistoryRouter } from 'redux-first-history/rr6';
import { LoaderAuth } from '@components/loader';
import { history } from '@redux/configure-store';

import { routes } from './routes/routes';
import { LoaderStateContext } from './react-contexts';

export const App: FC = () => {
    const { isLoading } = useContext(LoaderStateContext);

    return (
        <Fragment>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
            {isLoading && <LoaderAuth />}
        </Fragment>
    );
};
