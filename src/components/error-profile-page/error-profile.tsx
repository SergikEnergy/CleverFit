import { FC, ReactNode } from 'react';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Button, Result } from 'antd';

import { useModalReportContext } from '../../react-contexts';

import classes from './error-profile.module.css';

type ErrorProfilePropsType = {
    title?: string | ReactNode;
    subTitle?: string | ReactNode;
    buttonKey?: string;
    buttonText?: string;
    dataTestIdBtn?: string;
};

export const ErrorProfile: FC<ErrorProfilePropsType> = ({
    title,
    subTitle,
    buttonKey,
    buttonText,
    dataTestIdBtn,
}) => {
    const { closeModal, setNode } = useModalReportContext();

    const handleClickButton = () => {
        closeModal();
        setNode(null);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.icon}>
                <CloseCircleTwoTone style={{ fontSize: 22 }} twoToneColor={['red', '#fff']} />
            </div>
            <Result
                icon={null}
                className={classes.result}
                title={title}
                subTitle={subTitle}
                extra={
                    <Button
                        data-test-id={dataTestIdBtn}
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
