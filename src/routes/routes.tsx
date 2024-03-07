import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from '../hoc/ProtectedRoute';
import { Paths } from './pathes';
import { MainPage } from '@pages/main-page';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { CalendarPage } from '@pages/calendar-page';
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
import { ConfirmEmailPage } from '@pages/passwordPages/confirmEmail';
import { ChangePasswordPage } from '@pages/passwordPages/changePassword';
import { SuccessChangePasswordPage } from '@pages/resultsPages/successChangePassword';
import { ErrorChangePasswordPage } from '@pages/resultsPages/errorChangePassword';
import { DummyRootElement } from '@components/dummyRoot/dummyRoot';

export const routes = (
    <Routes>
        <Route path={Paths.ROOT} element={<DummyRootElement />} />
        <Route path={Paths.MAIN_PAGE} element={<MainPage />} />
        <Route path={Paths.FEEDBACKS_PAGE} element={<FeedbacksPage />} />
        <Route path={Paths.CALENDAR_PAGE} element={<CalendarPage />} />
        <Route path={Paths.AUTH} element={<EntryPageLayout />}>
            <Route index element={<LoginPage />} />
            <Route path={Paths.AUTH_REGISTRATION} element={<RegisterPage />} />
            <Route
                path={Paths.AUTH_CONFIRM_EMAIL}
                element={
                    <ProtectedRoute>
                        <ConfirmEmailPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={Paths.AUTH_CHANGE_PASS}
                element={
                    <ProtectedRoute>
                        <ChangePasswordPage />
                    </ProtectedRoute>
                }
            />
        </Route>

        <Route
            path={Paths.RESULT}
            element={
                <ProtectedRoute>
                    <ResultsPageLayout />
                </ProtectedRoute>
            }
        >
            <Route
                path={Paths.ERROR_LOGIN}
                element={
                    <ProtectedRoute>
                        <ErrorLoginPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={Paths.SUCCESS_REGISTRATION}
                element={
                    <ProtectedRoute>
                        <SuccessRegisterPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={Paths.SUCCESS_CHANGE_PASSWORD}
                element={
                    <ProtectedRoute>
                        <SuccessChangePasswordPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={Paths.ERROR_NO_USER_409}
                element={
                    <ProtectedRoute>
                        <ErrorUserExistPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={Paths.ERROR_CHECK_EMAIL}
                element={
                    <ProtectedRoute>
                        <ErrorCheckEmailPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={Paths.ERROR_NO_EMAIL_AND_404}
                element={
                    <ProtectedRoute>
                        <ErrorCheckNoExistEmailPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={Paths.ERROR_OTHERS}
                element={
                    <ProtectedRoute>
                        <ErrorOtherPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={Paths.ERROR_CHANGE_PASSWORD}
                element={
                    <ProtectedRoute>
                        <ErrorChangePasswordPage />
                    </ProtectedRoute>
                }
            />
        </Route>
    </Routes>
);
