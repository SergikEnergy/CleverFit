import { CloseCircleTwoTone } from '@ant-design/icons';

export type StatusMessageType = 'success' | 'error' | 'info';

export const getIconFromStatus = (status: StatusMessageType = 'error') => {
    switch (status) {
        case 'success':
            return <CloseCircleTwoTone style={{ fontSize: '24px' }} />;
        case 'error':
            return <CloseCircleTwoTone twoToneColor='red' style={{ fontSize: '24px' }} />;
        default:
            return <CloseCircleTwoTone twoToneColor='#2f54eb' style={{ fontSize: '24px' }} />;
    }
};
