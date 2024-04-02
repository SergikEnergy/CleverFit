import { Navigate, Route, Routes } from 'react-router-dom';
import { DummyRootElement } from '@components/dummy-root/dummy-root';
import { CalendarPage } from '@pages/calendar-page';
import { EntryPageLayout } from '@pages/entry-page';
import { LoginPage } from '@pages/entry-page/login';
import { RegisterPage } from '@pages/entry-page/register';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { MainPage } from '@pages/main-page';
import { NotFoundPage } from '@pages/not-found-page';
import { ChangePasswordPage } from '@pages/password-pages/change-password';
import { ConfirmEmailPage } from '@pages/password-pages/confirm-email';
import { ProfilePage } from '@pages/profile-page';
import { ErrorChangePasswordPage } from '@pages/results-pages/error-change-password';
import { ErrorCheckEmailPage } from '@pages/results-pages/error-check-email';
import { ErrorCheckNoExistEmailPage } from '@pages/results-pages/error-check-noexist-email';
import { ErrorLoginPage } from '@pages/results-pages/error-login';
import { ErrorOtherPage } from '@pages/results-pages/error-other';
import { ErrorUserExistPage } from '@pages/results-pages/error-user-exist';
import { ResultsPageLayout } from '@pages/results-pages/results-layout';
import { SuccessChangePasswordPage } from '@pages/results-pages/success-change-password';
import { SuccessRegisterPage } from '@pages/results-pages/success-register';
import { SettingsPage } from '@pages/settings-page';
import { TrainingsPage } from '@pages/trainings-page';

import { ProtectedRoute } from '../hoc';

import { Paths } from './pathes';

export const routes = (
    <Routes>
        <Route path={Paths.ROOT} element={<DummyRootElement />} />
        <Route path={Paths.MAIN_PAGE} element={<MainPage />} />
        <Route path={Paths.FEEDBACKS_PAGE} element={<FeedbacksPage />} />
        <Route path={Paths.CALENDAR_PAGE} element={<CalendarPage />} />
        <Route path={Paths.TRAININGS_PAGE} element={<TrainingsPage />} />
        <Route path={Paths.PROFILE_PAGE} element={<ProfilePage />} />
        <Route path={Paths.SETTINGS_PAGE} element={<SettingsPage />} />
        <Route path={Paths.AUTH} element={<EntryPageLayout />}>
            <Route index={true} element={<LoginPage />} />
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

        <Route path={Paths.NOT_FOUND_PAGE} element={<NotFoundPage />} />
        <Route
            path={Paths.OTHERS_ROOT}
            element={<Navigate to={Paths.NOT_FOUND_PAGE} replace={true} />}
        />
    </Routes>
);
