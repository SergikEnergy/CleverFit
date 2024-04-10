import { FC } from 'react';
import { PartnersShortCard } from '@components/partners-short-card';
import { useWindowWidth } from '@hooks/use-window-size';
import { usePartnersSelector } from '@redux/selectors';
import { sortPartnersByNameAndStatus } from '@utils/sort-status-name-users';
import { Col, Row } from 'antd';

import classes from './my-partners-block.module.css';

export const MyPartnersBlock: FC = () => {
    const { userPartners } = usePartnersSelector();
    const sortedPartners = userPartners.length > 0 ? sortPartnersByNameAndStatus(userPartners) : [];
    const innerWindowWidth = useWindowWidth();

    return (
        <div className={classes.wrapper}>
            <p className={classes.title}>Мои партнёры по тренировкам</p>
            <Row style={{ width: '100%' }} gutter={[16, 16]} className={classes.cards}>
                {sortedPartners.map((user, index) => (
                    <Col
                        key={`${user.id}-col`}
                        style={innerWindowWidth > 600 ? { width: '234px' } : { width: '316px' }}
                    >
                        <PartnersShortCard index={index} key={user.id} partner={user} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
