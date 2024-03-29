import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowWidth } from '@hooks/use-window-size';
import { Button, Result } from 'antd';

import { CollapsedContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import { NOT_FOUND } from './not-found.data';

import classes from './not-found-result.module.css';

export const NotFoundResult: FC = () => {
    const { hideCollapsed } = useContext(CollapsedContext);
    const navigate = useNavigate();
    const innerWindowWidth = useWindowWidth();

    if (innerWindowWidth < 570) {
        hideCollapsed();
    }

    const handleClickButton = () => {
        navigate(Paths.MAIN_PAGE, { replace: true });
    };

    return (
        <div className={classes.missing} data-test-id='modal-no-review'>
            <Result
                className={classes.content}
                status={NOT_FOUND.STATUS}
                title={NOT_FOUND.TITLE}
                subTitle={NOT_FOUND.SUBTITLE}
                extra={
                    <Button
                        className={classes.button}
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        key={NOT_FOUND.BUTTON_KEY}
                        htmlType='button'
                    >
                        {NOT_FOUND.BUTTON_TEXT}
                    </Button>
                }
            />
        </div>
    );
};
