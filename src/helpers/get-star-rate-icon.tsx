import { StarFilled, StarOutlined } from '@ant-design/icons';
import { RateProps } from 'antd';

export const getStarRateIcon = ({ value: index }: RateProps, activeIndex: number | null) => {
    if (index !== undefined && activeIndex !== null && index <= activeIndex) {
        return <StarFilled style={{ color: '#d89614' }} />;
    }

    return <StarOutlined style={{ color: '#d89614' }} />;
};
