import { FC, useContext } from 'react';

import { CollapsedContext } from '../../reactContexts/collapse-context';
import classes from './reviews.module.css';
import { Button } from 'antd';

export const Reviews: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
    return (
        <div className={!collapsed ? classes.reviews : `${classes.reviews} ${classes.collapsed}`}>
            <Button className='' type='text' block>
                Смотреть отзывы
            </Button>
        </div>
    );
};
