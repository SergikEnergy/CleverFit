import { FC } from 'react';

import classes from './reviews.module.css';
import { Button } from 'antd';

export const Reviews: FC = () => {
    return (
        <div className={classes.reviews}>
            <Button className='' type='text' block>
                Смотреть отзывы
            </Button>
        </div>
    );
};
