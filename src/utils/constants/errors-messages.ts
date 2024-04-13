import { ReactNode } from 'react';
import { ResultStatusType } from 'antd/lib/result';

type ErrorMessagesType = {
    buttonText?: string;
    title?: ReactNode | string;
    subTitle?: ReactNode | string;
    status?: ResultStatusType;
    buttonKey?: string;
};
export const ERROR_MODAL_WITHOUT_UPDATE: ErrorMessagesType = {
    title: 'При открытии данных произошла ошибка',
    subTitle: 'Попробуйте ещё раз.',
    buttonText: 'Обновить',
};

export const ERROR_FETCH_DATA_WITHOUT_UPDATE: ErrorMessagesType = {
    title: 'Что-то пошло не так',
    subTitle: 'Произошла ошибка, попробуйте ещё раз.',
    buttonText: 'Назад',
    status: '500',
    buttonKey: 'error fetch data',
};

export const ERROR_CHECK_NO_EXIST_EMAIL: ErrorMessagesType = {
    title: 'Такой e-mail не зарегистрирован',
    subTitle: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с\u00A0другим e-mail.',
    buttonText: 'Попробовать снова',
    status: 'error',
    buttonKey: 'e-mail not found auth',
};

export const ADD_FEEDBACK_ERROR_MESSAGES: ErrorMessagesType = {
    title: 'Данные не сохранились',
    subTitle: 'Что-то пошло не так. Попробуйте ещё раз.',
    status: 'error',
};

export const ERROR_CHANGE_PASSWORD_MESSAGES: ErrorMessagesType = {
    title: 'Данные не сохранились',
    subTitle: 'Что-то пошло не так. Попробуйте еще раз.',
    buttonText: 'Повторить',
    status: 'error',
    buttonKey: 'error change password',
};

export const ERROR_LOGIN_MESSAGES: ErrorMessagesType = {
    title: 'Вход не выполнен',
    subTitle: 'Что-то пошло не так. Попробуйте еще раз',
    buttonText: 'Повторить',
    status: 'warning',
    buttonKey: 'failed auth',
};

export const ERROR_CHECK_EMAIL_MESSAGES: ErrorMessagesType = {
    title: 'Что-то пошло не так',
    subTitle: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
    buttonText: 'Назад',
    status: '500',
    buttonKey: 'error500 e-mail auth',
};

export const ERROR_USER_EXIST_MESSAGES: ErrorMessagesType = {
    title: 'Данные не сохранились',
    subTitle:
        'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
    buttonText: 'Назад к регистрации',
    status: 'error',
    buttonKey: 'user already exist auth',
};

export const ERROR_OTHER_SIGN_MESSAGES: ErrorMessagesType = {
    title: 'Данные не сохранились',
    subTitle: 'Что-то пошло не так и ваша регистрация не\u00A0завершилась. Попробуйте ещё раз.',
    buttonText: 'Повторить',
    status: 'error',
    buttonKey: 'get other error auth',
};
