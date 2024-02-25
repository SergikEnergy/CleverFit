import { FC, useContext } from 'react';

import { LoaderStateContext } from '../../reactContexts/loader-context';
import { LottieAuthSlider } from './lotties/lottieSliderAuth';

import { Modal } from 'antd';
import classes from './loaderAuth.module.css';
import classnames from 'classnames';

export const LoaderAuth: FC = () => {
    const { isLoading } = useContext(LoaderStateContext);

    return (
        <Modal
            open={isLoading}
            style={{ backdropFilter: 'blur(3px)' }}
            width='100vw'
            className={classnames(classes.modal, classes.antFixed)}
            maskStyle={{
                background: 'var(--primary-light-8), rgba(0, 0, 0, 0.65)',
            }}
            bodyStyle={{ padding: 0, background: 'transparent' }}
            footer={null}
            closable={false}
            centered
        >
            <div className={classes.loader} data-test-id='loader'>
                <LottieAuthSlider />
            </div>
        </Modal>
    );
};
