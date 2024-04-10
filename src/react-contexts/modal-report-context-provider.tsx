import { FC, ReactNode, useMemo, useState } from 'react';

import { ModalReportContext } from './modal-report-context';

type ModalReportProviderPropsType = {
    children: ReactNode;
};

export const ModalReportContextProvider: FC<ModalReportProviderPropsType> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [width, setWidth] = useState<string>('');
    const [nodeForModal, setNodeForModal] = useState<ReactNode | null>(null);

    const setWidthModal = (newWidth: string) => setWidth(newWidth);

    const openModal = () => setIsOpen(true);

    const closeModal = () => setIsOpen(false);

    const setNode = (node: ReactNode) => setNodeForModal(node);

    const value = useMemo(
        () => ({
            isOpenModal: isOpen,
            closeModal,
            openModal,
            setNode,
            node: nodeForModal,
            widthModal: width,
            setWidthModal,
        }),
        [isOpen, nodeForModal, width],
    );

    return <ModalReportContext.Provider value={value}>{children}</ModalReportContext.Provider>;
};
