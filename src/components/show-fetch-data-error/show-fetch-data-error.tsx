import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

import { useModalReportContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './show-fetch-data-error.module.css';

export type PagesVariantsType = 'calendar' | 'feedback';

type ShowFetchDataErrorPropsType = {
    forPage: PagesVariantsType;
};

export const ShowFetchDataError: FC<ShowFetchDataErrorPropsType> = ({ forPage }) => {
    const navigate = useNavigate();
    const { closeModal, setNode } = useModalReportContext();
    const handleClickButton = () => {
        closeModal();
        setNode(null);
        if (forPage !== 'calendar') {
            navigate(Paths.MAIN_PAGE, { replace: true });
        }
    };

    const title = 'Что-то пошло не так';
    const subtitle = 'Произошла ошибка, попробуйте ещё раз.';
    const buttonText = 'Назад';
    const status = '500';
    const buttonKey = 'error get feedback';

    return (
        <div className={classes.result} data-test-id='modal-no-review'>
            <Result
                className={classes.error}
                status={status}
                title={title}
                subTitle={subtitle}
                extra={
                    <Button
                        color='#2f54eb'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        key={buttonKey}
                        htmlType='button'
                    >
                        {buttonText}
                    </Button>
                }
            />
        </div>
    );
};
