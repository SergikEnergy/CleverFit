import { Key, ReactNode } from 'react';

export type MyTrainingsTableDataType = {
    key: Key;
    badge: ReactNode;
    trainings: ReactNode;
    period: number;
    action: ReactNode;
};
