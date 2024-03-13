import { FC, useContext } from 'react';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { ModalReportContext } from '../../reactContexts/modalReport-context';

import classes from './ErrorAddTrain.module.css';

export const ErrorAddTrain: FC = () => {
    const { closeModal } = useContext(ModalReportContext);
    const title = 'При сохранении данных произошла ошибка';
    const subtitle = 'Придется попробуйте еще раз.';
    const buttonText = 'Закрыть';

    const handleCloseButtonClick = () => {
        closeModal();
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.main}>
                <div className={classes.status}>
                    {<CloseCircleTwoTone twoToneColor={'red'} style={{ fontSize: '24px' }} />}
                </div>
                <div className={classes.content}>
                    <div className={classes.title}>{title}</div>
                    <div className={classes.subtitle}>{subtitle}</div>
                </div>
            </div>
            <div className={classes.button}>
                <Button type='primary' htmlType='button' onClick={handleCloseButtonClick}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};
