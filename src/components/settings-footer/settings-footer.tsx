import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbacksActionButtons } from '@components/feedback-action-buttons';
import classnames from 'classnames';

import { Paths } from '../../routes/pathes';

import classes from './settings-footer.module.css';

type SettingsFooterTypeProps = {
    //
};

export const SettingsFooter: FC<SettingsFooterTypeProps> = () => {
    const navigate = useNavigate();

    const moveToReviewsHandler = () => {
        navigate(Paths.FEEDBACKS_PAGE, { replace: true });
    };

    return (
        <footer className={classnames(classes.footer, 'wrapper')}>
            <FeedbacksActionButtons
                allReviewAction={moveToReviewsHandler}
                buttonText='Смотреть все отзывы'
            />
        </footer>
    );
};
