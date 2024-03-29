import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export const getIconRender = (visible: boolean) =>
    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;
