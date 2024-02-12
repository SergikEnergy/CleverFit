import { FC, useContext } from 'react';

import { CollapsedContext } from '../../reactContexts/collapse-context';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classes from './switcher.module.css';
import classnames from 'classnames';

type SwitcherProps = {
    collapsed: boolean;
};

export const Switcher: FC<SwitcherProps> = ({ collapsed }) => {
    const { toggleCollapsed } = useContext(CollapsedContext);

    const toggleSider = () => {
        toggleCollapsed();
    };

    return (
        <div
            data-test-id='sider-switch'
            className={classnames(classes.switcher, { [classes.collapsed]: collapsed })}
        >
            {!collapsed ? (
                <MenuFoldOutlined data-test-id='sider-switch-mobile' onClick={toggleSider} />
            ) : (
                <MenuUnfoldOutlined data-test-id='sider-switch-mobile' onClick={toggleSider} />
            )}
        </div>
    );
};
