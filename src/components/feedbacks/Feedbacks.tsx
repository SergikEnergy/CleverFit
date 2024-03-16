import { FC, useState, useContext } from 'react';
import { IFeedbackResponse } from '@redux/API/api-types';
import { FeedbacksList } from '@components/feedbacksList';
import { ModalReportContext } from '../../reactContexts';
import { NewFeedback } from '@components/newFeedback';

import { Button } from 'antd';
import classes from './Feedbacks.module.css';

interface IFeedbacksProps {
    feedbacks: IFeedbackResponse[];
}

export const Feedbacks: FC<IFeedbacksProps> = ({ feedbacks }) => {
    const hiddenCommentText = 'Свернуть все отзывы';
    const spreadCommentText = 'Развернуть все отзывы';
    const { setNode, setWidthModal, openModal } = useContext(ModalReportContext);
    const [textButton, setTextButton] = useState<string>(spreadCommentText);
    const [limit, setLimit] = useState(4);

    const sortFeedbacksByDateAscend = (data: IFeedbackResponse[]) => {
        if (data.length === 1) {
            return data;
        }
        return data.sort((item1: IFeedbackResponse, item2: IFeedbackResponse) => {
            const dataItem1 = new Date(item1.createdAt);
            const dataItem2 = new Date(item2.createdAt);
            return -dataItem1.getTime() + dataItem2.getTime();
        });
    };

    const handleCreateButtonClick = () => {
        setNode(<NewFeedback />);
        setWidthModal('clamp(328px, 100%, 539px)');
        openModal();
    };

    const toggleAllComment = () => {
        setLimit((prev) => (prev === 4 && Array.isArray(feedbacks) ? feedbacks.length : 4));
        setTextButton((prev) =>
            prev === spreadCommentText ? hiddenCommentText : spreadCommentText,
        );
    };

    return (
        <div className={classes.feedbacks}>
            <FeedbacksList feedbacks={sortFeedbacksByDateAscend([...feedbacks])} limit={limit} />
            <div className={classes.navigation}>
                <Button
                    data-test-id='write-review'
                    onClick={handleCreateButtonClick}
                    htmlType='button'
                    type='primary'
                    size='large'
                    className={classes['button_filled']}
                >
                    Написать отзыв
                </Button>
                <Button
                    data-test-id='all-reviews-button'
                    htmlType='button'
                    className={classes['button_text']}
                    type='text'
                    size='large'
                    onClick={toggleAllComment}
                >
                    {textButton}
                </Button>
            </div>
        </div>
    );
};
