import { FC } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { useCollapseContext } from '../../react-contexts';

import classes from './switcher.module.css';

type SwitcherProps = {
    collapsed: boolean;
};

export const Switcher: FC<SwitcherProps> = ({ collapsed }) => {
    const { toggleCollapsed } = useCollapseContext();

    const toggleSider = () => toggleCollapsed();

    return (
        <div
            data-test-id='sider-switch'
            className={classnames(classes.switcher, { [classes.collapsed]: collapsed })}
        >
            {collapsed ? (
                <MenuUnfoldOutlined data-test-id='sider-switch-mobile' onClick={toggleSider} />
            ) : (
                <MenuFoldOutlined data-test-id='sider-switch-mobile' onClick={toggleSider} />
            )}
        </div>
    );
};
