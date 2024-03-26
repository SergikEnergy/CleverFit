import { UploadProps } from 'antd/es/upload';

export type RcCustomRequestOptions<T = any> = Parameters<
    Exclude<UploadProps<T>['customRequest'], undefined>
>[0];
