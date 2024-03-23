import { FC, useContext } from 'react';
import { Modal } from 'antd';
import classnames from 'classnames';

import { LoaderStateContext } from '../../react-contexts';

import { LottieAuthSlider } from './lotties/lottie-slider-auth';

import classes from './loader-auth.module.css';

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
            centered={true}
        >
            <div className={classes.loader} data-test-id='loader'>
                <LottieAuthSlider />
            </div>
        </Modal>
    );
};
