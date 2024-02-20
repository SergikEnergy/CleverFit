import { Routes, Route } from 'react-router-dom';

import { Paths } from './pathes';
import { MainPage } from '@pages/main-page';
import { EntryPageLayout } from '@pages/entry-page';
import { RegisterPage } from '@pages/entry-page/register';
import { LoginPage } from '@pages/entry-page/login';
import { ResultsPageLayout } from '@pages/resultsPages/resultsLayout';
import { ErrorLoginPage } from '@pages/resultsPages/errorLogin';
import { SuccessRegisterPage } from '@pages/resultsPages/successRegister';

export const routes = (
    <Routes>
        <Route path={Paths.AUTH} element={<EntryPageLayout />}>
            <Route index element={<LoginPage />} />
            <Route path={Paths.AUTH_REGISTRATION} element={<RegisterPage />} />
            <Route />
        </Route>
        <Route path={Paths.MAIN_PAGE} element={<MainPage />} />
        <Route path={Paths.RESULT} element={<ResultsPageLayout />}>
            <Route path={Paths.ERROR_LOGIN} element={<ErrorLoginPage />} />
            <Route path={Paths.SUCCESS_REGISTRATION} element={<SuccessRegisterPage />} />
        </Route>
    </Routes>
);
