import { FC, useContext } from 'react';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Button, Result } from 'antd';

import { ModalReportContext } from '../../react-contexts';

import { WRONG_SIZE_IMG } from './wrong-img-size.data';

import classes from './wrong-img-size.module.css';

type ErrorWrongImgSizePropsType = {
    disabledSubmit?: (value: boolean) => void;
};

export const ErrorWrongImgSize: FC<ErrorWrongImgSizePropsType> = ({ disabledSubmit }) => {
    const { closeModal, setNode } = useContext(ModalReportContext);

    const handleClickButton = () => {
        closeModal();
        setNode(null);
        if (disabledSubmit) disabledSubmit(true);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.icon}>
                <CloseCircleTwoTone style={{ fontSize: 22 }} twoToneColor={['red', '#fff']} />
            </div>
            <Result
                icon={null}
                className={classes.result}
                title={WRONG_SIZE_IMG.title}
                subTitle={WRONG_SIZE_IMG.subTitle}
                extra={
                    <Button
                        color='#2f54eb'
                        onClick={handleClickButton}
                        size='large'
                        type='primary'
                        key={WRONG_SIZE_IMG.buttonKey}
                        htmlType='button'
                    >
                        {WRONG_SIZE_IMG.buttonText}
                    </Button>
                }
            />
        </div>
    );
};
