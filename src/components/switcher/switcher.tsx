import { FC } from 'react';

import classes from './switcher.module.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { toggleCollapse } from '@redux/reducers/collapseMenu';

type SwitcherProps = {
    collapsed: boolean;
};

export const Switcher: FC<SwitcherProps> = ({ collapsed }) => {
    const dispatch = useAppDispatch();
    const toggleSider = () => {
        dispatch(toggleCollapse());
    };

    return (
        <div className={`${classes.switcher} ${collapsed && classes.collapsed}`}>
            {!collapsed ? (
                <MenuFoldOutlined onClick={toggleSider} />
            ) : (
                <MenuUnfoldOutlined onClick={toggleSider} />
            )}
        </div>
    );
};
