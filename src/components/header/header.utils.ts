import { Paths } from '../../routes/pathes';
import { breadcrumbsInitialItems, pathsNamesDescriptions } from './header.data';

export const prepareDataForBreadCrumbs = (pathName: string) => {
    if (pathName !== Paths.MAIN_PAGE) {
        const pathsSnippets = pathName.split('/');
        pathsSnippets.splice(0, 1);
        const result = pathsSnippets.map((_, index) => {
            const url = `/${pathsSnippets.slice(0, index + 1).join('/')}`;
            return {
                key: pathsNamesDescriptions[url],
                path: url,
                pathName: pathsNamesDescriptions[url],
            };
        });
        result.unshift(breadcrumbsInitialItems[0]);
        return result;
    }
    return breadcrumbsInitialItems;
};
