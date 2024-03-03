import { createContext, ReactNode } from 'react';

export type ModalFeedbackType = {
    isOpenModal: boolean;
    node: ReactNode | null;
    widthModal: string;
    setWidthModal: (width: string) => void;
    setNode: (node: ReactNode) => void;
    openModal: () => void;
    closeModal: () => void;
};

const initialContext: ModalFeedbackType = {
    isOpenModal: false,
    widthModal: '',
    node: null,
    setWidthModal: (width) => {
        console.log(width);
    },
    openModal: () => {
        //
    },

    closeModal: () => {
        //
    },
    setNode: (node) => {
        console.log(node);
    },
};

export const ModalFeedbackContext = createContext<ModalFeedbackType>(initialContext);
