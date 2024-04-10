import { FC } from 'react';
import { Modal } from 'antd';

import { useModalReportContext } from '../../react-contexts';

import classes from './modal-popup.module.css';

export const ModalPopUp: FC = () => {
    const { isOpenModal, node, widthModal } = useModalReportContext();

    return (
        <Modal
            width={`${widthModal}`}
            bodyStyle={{ margin: 'auto', padding: 0, width: '100%' }}
            closeIcon={null}
            title=''
            centered={true}
            wrapClassName={classes.wrapper}
            closable={false}
            open={isOpenModal}
            footer={null}
            maskClosable={false}
        >
            {node}
        </Modal>
    );
};
