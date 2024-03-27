import { FC, useContext } from 'react';
import { NewFeedback } from '@components/new-feedback';
import { Button } from 'antd';

import { ModalReportContext } from '../../react-contexts';

import classes from './feedback-action-buttons.module.css';

type FeedbacksActionButtonsType = {
    allReviewAction: () => void;
    buttonText: string;
};

export const FeedbacksActionButtons: FC<FeedbacksActionButtonsType> = ({
    allReviewAction,
    buttonText,
}) => {
    const { setNode, setWidthModal, openModal } = useContext(ModalReportContext);

    const handleCreateButtonClick = () => {
        setNode(<NewFeedback />);
        setWidthModal('clamp(328px, 100%, 539px)');
        openModal();
    };

    return (
        <div className={classes.navigation}>
            <Button
                data-test-id='write-review'
                onClick={handleCreateButtonClick}
                htmlType='button'
                type='primary'
                size='large'
                className={classes.button_filled}
            >
                Написать отзыв
            </Button>
            <Button
                data-test-id='all-reviews-button'
                htmlType='button'
                className={classes.button_text}
                type='text'
                size='large'
                onClick={allReviewAction}
            >
                {buttonText}
            </Button>
        </div>
    );
};
