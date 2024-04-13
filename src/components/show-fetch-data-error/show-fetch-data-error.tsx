import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ERROR_FETCH_DATA_WITHOUT_UPDATE } from '@utils/constants/errors-messages';
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
        if (forPage === 'feedback') {
            navigate(Paths.MAIN_PAGE, { replace: true });
        }
    };

    return (
        <div className={classes.result} data-test-id='modal-no-review'>
            <Result
                className={classes.error}
                status={ERROR_FETCH_DATA_WITHOUT_UPDATE.status}
                title={ERROR_FETCH_DATA_WITHOUT_UPDATE.title}
                subTitle={ERROR_FETCH_DATA_WITHOUT_UPDATE.subTitle}
                extra={
                    <Button
                        color='#2f54eb'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        key={ERROR_FETCH_DATA_WITHOUT_UPDATE.buttonKey}
                        htmlType='button'
                    >
                        {ERROR_FETCH_DATA_WITHOUT_UPDATE.buttonText}
                    </Button>
                }
            />
        </div>
    );
};
