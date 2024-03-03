import { FC, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Paths } from '../../routes/pathes';

import { CollapsedContext } from '../../reactContexts/collapse-context';

import { Button } from 'antd';
import classes from './reviews.module.css';
import classnames from 'classnames';

export const Reviews: FC = () => {
    const location = useLocation();
    const { collapsed } = useContext(CollapsedContext);

    const handleClick = () => {
        history.push(Paths.FEEDBACKS_PAGE, { fromPage: location.pathname });
    };

    return (
        <div className={classnames(classes.reviews, { [classes.collapsed]: collapsed })}>
            <Button
                data-test-id='see-reviews'
                className=''
                type='text'
                block
                htmlType='button'
                onClick={handleClick}
            >
                Смотреть отзывы
            </Button>
        </div>
    );
};
