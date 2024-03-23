import { ResultStatusType } from 'antd/lib/result';

type NotFoundResultDataType = {
    TITLE: string;
    SUBTITLE: string;
    BUTTON_TEXT: string;
    BUTTON_KEY: string;
    STATUS: ResultStatusType;
};

export const NOT_FOUND: NotFoundResultDataType = {
    TITLE: 'Такой страницы нет',
    SUBTITLE: 'Извините, страница не найдена, возможно, она была удалена или перемещена.',
    BUTTON_TEXT: 'На главную',
    BUTTON_KEY: 'return from not-found to main',
    STATUS: '404',
};
