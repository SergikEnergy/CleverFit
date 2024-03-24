export const enum Paths {
    ROOT = '/',
    MAIN_PAGE = '/main',
    FEEDBACKS_PAGE = '/feedbacks',
    CALENDAR_PAGE = '/calendar',
    AUTH = '/auth',
    AUTH_GOOGLE = '/google',
    AUTH_REGISTRATION = '/auth/registration',
    AUTH_CONFIRM_EMAIL = '/auth/confirm-email',
    AUTH_CHANGE_PASS = '/auth/change-password',
    RESULT = '/result',
    ERROR_LOGIN = '/result/error-login',
    SUCCESS_REGISTRATION = '/result/success',
    SUCCESS_CHANGE_PASSWORD = '/result/success-change-password',
    ERROR_NO_USER_409 = '/result/error-user-exist',
    ERROR_OTHERS = '/result/error',
    ERROR_NO_EMAIL_AND_404 = '/result/error-check-email-no-exist',
    ERROR_CHECK_EMAIL = '/result/error-check-email',
    ERROR_CHANGE_PASSWORD = '/result/error-change-password',
    PROFILE_PAGE = '/profile',
    NOT_FOUND_PAGE = 'not-found',
    OTHERS_ROOT = '*',
}
