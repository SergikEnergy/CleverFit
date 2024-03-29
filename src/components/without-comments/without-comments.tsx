import { FC, useContext } from 'react';
import { NewFeedback } from '@components/new-feedback';
import { Button } from 'antd';

import { ModalReportContext } from '../../react-contexts';

import classes from './without-comments.module.css';

export const WithoutComments: FC = () => {
    const { openModal, setNode, setWidthModal } = useContext(ModalReportContext);
    const handleAddFeedback = () => {
        setNode(<NewFeedback />);
        setWidthModal('clamp(328px, 100%, 539px)');
        openModal();
    };

    return (
        <div className={classes.feedback__empty}>
            <div className={classes.wrapper}>
                <div className={classes.description}>
                    <div className={classes.title}>Оставьте свой отзыв первым</div>
                    <div className={classes.content}>
                        Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                        <br className={classes.breaks} />
                        Поделитесь своим мнением и опытом с другими пользователями,
                        <br className={classes.breaks} /> и&nbsp;помогите им сделать правильный
                        выбор.
                    </div>
                </div>
                <div className={classes.button}>
                    <Button
                        data-test-id='write-review'
                        block={true}
                        htmlType='button'
                        type='primary'
                        onClick={handleAddFeedback}
                    >
                        Написать отзыв
                    </Button>
                </div>
            </div>
        </div>
    );
};
