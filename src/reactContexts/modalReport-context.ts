import { createContext, ReactNode } from 'react';

export type ModalReportType = {
    isOpenModal: boolean;
    node: ReactNode | null;
    widthModal: string;
    setWidthModal: (width: string) => void;
    setNode: (node: ReactNode) => void;
    openModal: () => void;
    closeModal: () => void;
};

const initialContext: ModalReportType = {
    isOpenModal: false,
    widthModal: '',
    node: null,
    setWidthModal: (width) => {
        //
    },
    openModal: () => {
        //
    },

    closeModal: () => {
        //
    },
    setNode: (node) => {
        //
    },
};

export const ModalReportContext = createContext<ModalReportType>(initialContext);
