import { Routes, Route } from 'react-router-dom';

import { Paths } from './pathes';
import { MainPage } from '@pages/main-page';
import { EntryPageLayout } from '@pages/entry-page';
import { RegisterPage } from '@pages/entry-page/register';
import { LoginPage } from '@pages/entry-page/login';

export const routes = (
    <Routes>
        <Route path={Paths.AUTH} element={<EntryPageLayout />}>
            <Route index element={<RegisterPage />} />
            <Route path={Paths.AUTH_REGISTRATION} element={<RegisterPage />} />
            <Route path={Paths.AUTH_LOGIN} element={<LoginPage />} />
            <Route />
        </Route>
        <Route path={Paths.MAIN_PAGE} element={<MainPage />} />
    </Routes>
);
