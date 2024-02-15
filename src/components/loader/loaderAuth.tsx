import { FC, ReactNode, useContext } from 'react';

import { LoaderStateContext } from '../../reactContexts/loader-context';
import { LottieAuthSlider } from './lotties/lottieSliderAuth';

import { Modal } from 'antd';
import classes from './loaderAuth.module.css';
import classnames from 'classnames';

export const LoaderAuth: FC = () => {
    const { isLoading, stopLoader } = useContext(LoaderStateContext);

    const handleModalClose = () => {
        stopLoader();
    };

    return (
        <Modal
            open={isLoading}
            style={{ width: '150px', height: '150px' }}
            className={classnames(classes.modal, classes.antFixed)}
            maskStyle={{
                background: 'var(--primary-light-8), rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(3px)',
            }}
            bodyStyle={{ padding: 0, background: 'transparent' }}
            footer={null}
            closable={false}
            centered
        >
            <div className={classes.loader}>
                <LottieAuthSlider />
            </div>
        </Modal>
    );
};
