import { FC } from 'react';

import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Menu, Typography, Divider } from 'antd';
import Icon from '@ant-design/icons';
import { ExitIcon } from '../../customIcon/exitIcon';

import classes from './exitUser.module.css';

const CustomExitIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ExitIcon} {...props} />
);

export const ExitUser: FC = () => {
    return (
        <>
            <Divider style={{ margin: 0 }} />
            <Menu className={classes.exit}>
                <Menu.Item className={classes['exit__item']} key='exit' icon={<CustomExitIcon />}>
                    <Typography.Text className={classes['exit__text']}>Выход</Typography.Text>
                </Menu.Item>
            </Menu>
        </>
    );
};
