import { Routes, Route } from 'react-router-dom';

import { Paths } from './pathes';
import { MainPage } from '@pages/main-page';
import { EntryPageLayout } from '@pages/entry-page';
import { RegisterPage } from '@pages/entry-page/register';
import { LoginPage } from '@pages/entry-page/login';
import { ResultsPageLayout } from '@pages/resultsPages/resultsLayout';
import { ErrorLoginPage } from '@pages/resultsPages/errorLogin';
import { SuccessRegisterPage } from '@pages/resultsPages/successRegister';
import { ErrorUserExistPage } from '@pages/resultsPages/errorUserExist';
import { ErrorCheckEmailPage } from '@pages/resultsPages/errorCheckEmail';
import { ErrorCheckNoExistEmailPage } from '@pages/resultsPages/errorCheckNoExistEmail';
import { ErrorOtherPage } from '@pages/resultsPages/errorOther';
import { ConfirmEmailPage } from '@pages/passwordPages/confirmPassword';
import { ChangePasswordPage } from '@pages/passwordPages/changePassword';
import { SuccessChangePasswordPage } from '@pages/resultsPages/successChangePassword';
import { ErrorChangePasswordPage } from '@pages/resultsPages/errorChangePassword';

export const routes = (
    <Routes>
        <Route path={Paths.AUTH} element={<EntryPageLayout />}>
            <Route index element={<LoginPage />} />
            <Route path={Paths.AUTH_REGISTRATION} element={<RegisterPage />} />
            <Route path={Paths.AUTH_CONFIRM_PASS} element={<ConfirmEmailPage />} />
            <Route path={Paths.AUTH_CHANGE_PASS} element={<ChangePasswordPage />} />
        </Route>
        <Route path={Paths.MAIN_PAGE} element={<MainPage />} />
        <Route path={Paths.RESULT} element={<ResultsPageLayout />}>
            <Route path={Paths.ERROR_LOGIN} element={<ErrorLoginPage />} />
            <Route path={Paths.SUCCESS_REGISTRATION} element={<SuccessRegisterPage />} />
            <Route path={Paths.SUCCESS_CHANGE_PASSWORD} element={<SuccessChangePasswordPage />} />
            <Route path={Paths.ERROR_NO_USER_409} element={<ErrorUserExistPage />} />
            <Route path={Paths.ERROR_CHECK_EMAIL} element={<ErrorCheckEmailPage />} />
            <Route path={Paths.ERROR_NO_EMAIL_AND_404} element={<ErrorCheckNoExistEmailPage />} />
            <Route path={Paths.ERROR_OTHERS} element={<ErrorOtherPage />} />
            <Route path={Paths.ERROR_CHANGE_PASSWORD} element={<ErrorChangePasswordPage />} />
        </Route>
    </Routes>
);
