import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

import { CustomIcon } from './custom-icon';

export const ProfileIconComponent = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CustomIcon} {...props} />
);
