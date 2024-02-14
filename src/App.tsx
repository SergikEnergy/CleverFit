import { FC } from 'react';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { routes } from './routes/routes';

export const App: FC = () => <HistoryRouter history={history}>{routes}</HistoryRouter>;
