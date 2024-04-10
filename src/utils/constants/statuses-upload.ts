export type UploadStatusType = 'error' | 'done';

export const UPLOAD_STATUSES: Record<UploadStatusType, UploadStatusType> = {
    error: 'error',
    done: 'done',
};
