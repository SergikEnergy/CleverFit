import { FC, useState, ReactNode } from 'react';
import { ModalReportContext } from './modalReport-context';

interface ModalReportProviderProps {
    children: ReactNode;
}

export const ModalReportContextProvider: FC<ModalReportProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [width, setWidth] = useState<string>('');
    const [nodeForModal, setNodeForModal] = useState<ReactNode | null>(null);

    const setWidthModal = (width: string) => {
        setWidth(width);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const setNode = (node: ReactNode) => {
        setNodeForModal(node);
    };

    return (
        <ModalReportContext.Provider
            value={{
                isOpenModal: isOpen,
                closeModal,
                openModal,
                setNode,
                node: nodeForModal,
                widthModal: width,
                setWidthModal,
            }}
        >
            {children}
        </ModalReportContext.Provider>
    );
};
