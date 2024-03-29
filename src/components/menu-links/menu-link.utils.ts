import { menuItemsKeys } from './menu-links.data';

export const getSelectedKey = (pathname: string) =>
    menuItemsKeys[pathname] ? menuItemsKeys[pathname] : '';
