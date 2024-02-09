import { FC } from 'react';

import classes from './reviews.module.css';
import { Button } from 'antd';

export const Reviews: FC = () => {
    return (
        <div className={classes.reviews}>
            <Button type='text' block>
                Смотреть отзывы
            </Button>
        </div>
    );
};
