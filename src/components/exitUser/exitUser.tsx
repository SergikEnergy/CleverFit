import { FC, useContext } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { resetCredentials } from '@redux/reducers/authSlice';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';

import { CollapsedContext } from '../../reactContexts';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Menu, Typography, Divider } from 'antd';
import Icon from '@ant-design/icons';
import { ExitIcon } from '../customIcon/exitIcon';

import classes from './exitUser.module.css';
import classnames from 'classnames';

const CustomExitIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ExitIcon} {...props} />
);

export const ExitUser: FC = () => {
    const dispatch = useAppDispatch();
    const { collapsed } = useContext(CollapsedContext);

    const handleExitUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
        dispatch(resetCredentials());
    };
    return (
        <>
            <Divider style={{ margin: 0 }} />
            <Menu
                className={classes.exit}
                style={!collapsed ? { width: '100%' } : { width: '64px' }}
            >
                <Menu.Item
                    onClick={handleExitUser}
                    className={classnames(classes['exit__item'], classes.antFixed, {
                        [classes.collapsed]: collapsed,
                    })}
                    key='exit'
                    icon={
                        <CustomExitIcon
                            className={classnames(classes['exit__icon'], classes.antFixed)}
                        />
                    }
                >
                    <Typography.Text
                        className={classnames(classes.antFixed, classes['exit__text'])}
                    >
                        Выход
                    </Typography.Text>
                </Menu.Item>
            </Menu>
        </>
    );
};
