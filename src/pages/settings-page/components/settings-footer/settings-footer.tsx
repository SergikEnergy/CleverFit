import { FC } from 'react';
import { FeedbacksActionButtons } from '@components/feedback-action-buttons';
import { history } from '@redux/configure-store';
import classnames from 'classnames';

import { Paths } from '../../../../routes/pathes';

import classes from './settings-footer.module.css';

type SettingsFooterTypeProps = {
    //
};

export const SettingsFooter: FC<SettingsFooterTypeProps> = () => {
    const moveToReviewsHandler = () => {
        history.push(Paths.FEEDBACKS_PAGE);
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
