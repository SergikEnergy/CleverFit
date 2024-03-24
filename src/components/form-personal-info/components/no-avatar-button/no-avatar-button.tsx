import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import classes from './no-avatar-button.module.css';

type NoAvatarButtonPropsType = {
    //
};

export const NoAvatarButton: FC<NoAvatarButtonPropsType> = () => (
    <button type='button' className={classes.empty}>
        <PlusOutlined style={{ color: '#000', fontSize: 14 }} />
        <div className={classes.description}>Загрузить фото профиля</div>
    </button>
);
