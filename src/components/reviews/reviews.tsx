import { FC, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Button } from 'antd';
import classnames from 'classnames';

import { CollapsedContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './reviews.module.css';

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
                block={true}
                htmlType='button'
                onClick={handleClick}
            >
                Смотреть отзывы
            </Button>
        </div>
    );
};
