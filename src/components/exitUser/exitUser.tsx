import { FC } from 'react';

import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Menu, Typography, Divider } from 'antd';
import Icon from '@ant-design/icons';
import { ExitIcon } from '../customIcon/exitIcon';

import classes from './exitUser.module.css';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

const CustomExitIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ExitIcon} {...props} />
);

export const ExitUser: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);
    return (
        <>
            <Divider style={{ margin: 0 }} />
            <Menu
                className={classes.exit}
                style={!collapsed ? { width: '100%' } : { width: '64px' }}
            >
                <Menu.Item
                    className={
                        !collapsed
                            ? classes['exit__item']
                            : `${classes['exit__item']} ${classes.collapsed}`
                    }
                    key='exit'
                    icon={<CustomExitIcon className={classes['exit__icon']} />}
                >
                    <Typography.Text className={classes['exit__text']}>Выход</Typography.Text>
                </Menu.Item>
            </Menu>
        </>
    );
};
