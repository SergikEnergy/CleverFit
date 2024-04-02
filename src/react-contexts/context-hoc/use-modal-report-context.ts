import { useContext } from 'react';

import { ModalReportContext } from '../modal-report-context';

export const useModalReportContext = () => useContext(ModalReportContext);
