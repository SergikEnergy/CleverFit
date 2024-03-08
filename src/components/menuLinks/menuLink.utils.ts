import { menuItemsKeys } from './menuLinks.data';

export const getSelectedKey = (pathname: string) => {
    return menuItemsKeys[pathname] ? menuItemsKeys[pathname] : '';
};
