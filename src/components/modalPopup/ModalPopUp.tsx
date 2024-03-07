import { FC, useContext } from 'react';
import { ModalReportContext } from '../../reactContexts/modalReport-context';

import { Modal } from 'antd';
import classes from './ModalPopUp.module.css';

export const ModalPopUp: FC = () => {
    const { isOpenModal, node, widthModal } = useContext(ModalReportContext);

    return (
        <Modal
            width={`${widthModal}`}
            bodyStyle={{ margin: 'auto', padding: 0, width: '100%' }}
            closeIcon={null}
            title=''
            centered
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
