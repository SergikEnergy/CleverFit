import { FC, useContext } from 'react';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Button, Result } from 'antd';

import { ModalReportContext } from '../../react-contexts';

import { WRONG_SIZE_IMG } from './wrong-img-size.data';

import classes from './wrong-img-size.module.css';

export const ErrorWrongImgSize: FC = () => {
    const { closeModal, setNode } = useContext(ModalReportContext);

    const handleClickButton = () => {
        closeModal();
        setNode(null);
    };

    return (
        <div className={classes.wrapper}>
            <Result
                className={classes.result}
                icon={
                    <CloseCircleTwoTone style={{ fontSize: 22 }} twoToneColor={['red', '#fff']} />
                }
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
