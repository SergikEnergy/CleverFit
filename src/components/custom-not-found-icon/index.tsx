import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

import { CustomIconFromSvg } from './custom-icon-from-svg';

export const CustomNotFoundIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CustomIconFromSvg} {...props} />
);
