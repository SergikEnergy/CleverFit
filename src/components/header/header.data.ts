import { Paths } from '../../routes/pathes';

export type BreadCrumbsType = {
    key: string;
    path: string;
    pathName: string;
};

export const pathsNamesDescriptions: Record<string, string> = {
    [Paths.MAIN_PAGE]: 'Главная',
    [Paths.FEEDBACKS_PAGE]: 'Отзывы покупателей',
    [Paths.CALENDAR_PAGE]: 'Календарь',
};

export const breadcrumbsInitialItems: BreadCrumbsType[] = [
    {
        key: 'Главная',
        path: Paths.MAIN_PAGE,
        pathName: 'Главная',
    },
];
