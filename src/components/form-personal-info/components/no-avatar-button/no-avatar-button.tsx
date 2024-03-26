import { FC } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import classes from './no-avatar-button.module.css';

export const NoAvatarButton: FC = () => {
    if (window.innerWidth < 500) {
        return (
            <div className={classes.small}>
                <div className={classes.small__description}>Загрузить фото профиля</div>
                <Button icon={<UploadOutlined />}>Загрузить</Button>
            </div>
        );
    }

    return (
        <button type='button' className={classes.empty}>
            <PlusOutlined style={{ color: '#000', fontSize: 14 }} />
            <div className={classes.description}>Загрузить фото профиля</div>
        </button>
    );
};
