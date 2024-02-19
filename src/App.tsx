import { FC, useContext } from 'react';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { routes } from './routes/routes';

import { LoaderAuth } from '@components/loader';
import { LoaderStateContext } from './reactContexts/loader-context';

export const App: FC = () => {
    const { isLoading } = useContext(LoaderStateContext);
    return (
        <>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
            {isLoading && <LoaderAuth />}
        </>
    );
};
