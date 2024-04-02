import { FC } from 'react';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Button } from 'antd';

import { useModalReportContext } from '../../react-contexts';

import classes from './error-add-train.module.css';

export const ErrorAddTrain: FC = () => {
    const { closeModal } = useModalReportContext();
    const title = 'При сохранении данных произошла ошибка';
    const subtitle = 'Придётся попробовать ещё раз.';
    const buttonText = 'Закрыть';

    const handleCloseButtonClick = () => closeModal();

    return (
        <div className={classes.wrapper}>
            <div className={classes.main}>
                <div className={classes.status}>
                    <CloseCircleTwoTone twoToneColor='red' style={{ fontSize: '24px' }} />
                </div>
                <div className={classes.content}>
                    <div className={classes.title} data-test-id='modal-error-user-training-title'>
                        {title}
                    </div>
                    <div
                        className={classes.subtitle}
                        data-test-id='modal-error-user-training-subtitle'
                    >
                        {subtitle}
                    </div>
                </div>
            </div>
            <div className={classes.button}>
                <Button
                    type='primary'
                    data-test-id='modal-error-user-training-button'
                    htmlType='button'
                    onClick={handleCloseButtonClick}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};
