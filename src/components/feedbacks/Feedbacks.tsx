import { FC, useState, useContext } from 'react';
import { IFeedbackResponse } from '@redux/API/api-types';
import { FeedbacksList } from '@components/feedbacksList';
import { ModalFeedbackContext } from '../../reactContexts/modalFeedback-context';
import { NewFeedback } from '@components/newFeedback';

import { Button } from 'antd';
import classes from './Feedbacks.module.css';

interface IFeedbacksProps {
    feedbacks: IFeedbackResponse[] | undefined;
}

export const Feedbacks: FC<IFeedbacksProps> = ({ feedbacks }) => {
    const { setNode, setWidthModal, openModal } = useContext(ModalFeedbackContext);
    const [limit, setLimit] = useState(4);
    console.log(feedbacks);
    const sortedFeedbacks = Array.isArray(feedbacks)
        ? feedbacks.toSorted((item1: IFeedbackResponse, item2: IFeedbackResponse) => {
              const dataItem1 = new Date(item1.createdAt);
              const dataItem2 = new Date(item2.createdAt);
              return dataItem1.getTime() - dataItem2.getTime();
          })
        : [];

    const handleCreateButtonClick = () => {
        setNode(<NewFeedback />);
        setWidthModal('clamp(328px, 100%, 539px)');
        openModal();
    };

    const handleShowAllButton = () => {
        setLimit((prev) => (prev === 4 && Array.isArray(feedbacks) ? feedbacks.length : 4));
    };

    return (
        <div className={classes.feedbacks}>
            <FeedbacksList feedbacks={sortedFeedbacks} limit={limit} />
            <div className={classes.navigation}>
                <Button
                    onClick={handleCreateButtonClick}
                    htmlType='button'
                    type='primary'
                    size='large'
                    className={classes['button_filled']}
                >
                    Написать отзыв
                </Button>
                <Button
                    htmlType='button'
                    className={classes['button_text']}
                    type='text'
                    onClick={handleShowAllButton}
                >
                    Развернуть все отзывы
                </Button>
            </div>
        </div>
    );
};
