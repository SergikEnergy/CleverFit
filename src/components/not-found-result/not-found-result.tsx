import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

import { CollapsedContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import { NOT_FOUND } from './not-found.data';

import classes from './not-found-result.module.css';

export const NotFoundResult: FC = () => {
    const { hideCollapsed: hide } = useContext(CollapsedContext);
    const navigate = useNavigate();

    const hideCollapsed = () => {
        if (window.innerWidth < 570) {
            hide();
        }
    };

    useEffect(() => {
        hideCollapsed();
        window.addEventListener('resize', hideCollapsed);

        return () => {
            window.removeEventListener('resize', hideCollapsed);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
