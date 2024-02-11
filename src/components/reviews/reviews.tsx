import { FC, useContext } from 'react';

import { CollapsedContext } from '../../reactContexts/collapse-context';

import { Button } from 'antd';
import classes from './reviews.module.css';
import classnames from 'classnames';

export const Reviews: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
    return (
        <div className={classnames(classes.reviews, { [classes.collapsed]: collapsed })}>
            <Button className='' type='text' block>
                Смотреть отзывы
            </Button>
        </div>
    );
};
