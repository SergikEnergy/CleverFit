import { FC } from 'react';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import classes from './reviews.module.css';
import { Button } from 'antd';

export const Reviews: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);
    return (
        <div className={!collapsed ? classes.reviews : `${classes.reviews} ${classes.collapsed}`}>
            <Button className='' type='text' block>
                Смотреть отзывы
            </Button>
        </div>
    );
};
