import { FC, useState, ReactNode } from 'react';
import { ModalFeedbackContext } from './modalFeedback-context';

interface ModalFeedBackProviderProps {
    children: ReactNode;
}

export const ModalFeedbackContextProvider: FC<ModalFeedBackProviderProps> = ({ children }) => {
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
        <ModalFeedbackContext.Provider
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
        </ModalFeedbackContext.Provider>
    );
};
