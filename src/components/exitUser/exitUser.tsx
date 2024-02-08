import { FC } from 'react';

import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Menu, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { ExitIcon } from '../../customIcon/exitIcon';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import classes from './exitUser.module.css';

const CustomExitIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ExitIcon} {...props} />
);

export const ExitUser: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);

    return (
        <Menu className={classes.exit} inlineCollapsed={collapsed}>
            <Menu.Item className={classes['exit__item']} key='exit' icon={<CustomExitIcon />}>
                <Typography.Text className={classes['exit__text']}>Выход</Typography.Text>
            </Menu.Item>
        </Menu>
    );
};
