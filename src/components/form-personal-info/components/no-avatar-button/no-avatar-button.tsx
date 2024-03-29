import { FC, Fragment } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@hooks/use-window-size';
import { Button } from 'antd';

import classes from './no-avatar-button.module.css';

export const NoAvatarButton: FC = () => {
    const innerWindowWidth = useWindowWidth();

    return (
        <Fragment>
            {innerWindowWidth < 550 && (
                <div className={classes.small}>
                    <div className={classes.small__description}>Загрузить фото профиля</div>
                    <Button icon={<UploadOutlined />}>Загрузить</Button>
                </div>
            )}
            {innerWindowWidth >= 550 && (
                <button type='button' className={classes.empty}>
                    <PlusOutlined style={{ color: '#000', fontSize: 14 }} />
                    <div className={classes.description}>Загрузить фото профиля</div>
                </button>
            )}
        </Fragment>
    );
};
