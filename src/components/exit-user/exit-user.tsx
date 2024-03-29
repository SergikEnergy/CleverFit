import { FC, Fragment, useContext } from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/api/api-data';
import { resetCredentials } from '@redux/reducers/auth-slice';
import { Divider, Menu, Typography } from 'antd';
import classnames from 'classnames';

import { CollapsedContext } from '../../react-contexts';
import { ExitIcon } from '../custom-icons/exit-icon';

import classes from './exit-user.module.css';

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
        <Fragment>
            <Divider style={{ margin: 0 }} />
            <Menu
                className={classes.exit}
                style={collapsed ? { width: '64px' } : { width: '100%' }}
            >
                <Menu.Item
                    onClick={handleExitUser}
                    className={classnames(classes.exit__item, classes.antFixed, {
                        [classes.collapsed]: collapsed,
                    })}
                    key='exit'
                    icon={
                        <CustomExitIcon
                            className={classnames(classes.exit__icon, classes.antFixed)}
                        />
                    }
                >
                    <Typography.Text className={classnames(classes.antFixed, classes.exit__text)}>
                        Выход
                    </Typography.Text>
                </Menu.Item>
            </Menu>
        </Fragment>
    );
};
