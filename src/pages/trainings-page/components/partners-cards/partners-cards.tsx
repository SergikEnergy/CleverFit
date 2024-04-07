import { FC } from 'react';
import { PartnersCard } from '@components/partners-card';
import { PartnersResponseType } from '@redux/api/api-types';
import { Col, Row } from 'antd';

import classes from './partners-cards.module.css';

type PartnersCardsPropsType = {
    partners: PartnersResponseType[];
    selectedPhrase: string;
};

export const PartnersCards: FC<PartnersCardsPropsType> = ({ partners, selectedPhrase }) => (
    <div className={classes.cards}>
        <Row gutter={[16, 16]}>
            {partners.map((partner, index) => (
                <Col span={6} key={`${partner}-${index + 1}`}>
                    <PartnersCard partner={partner} index={index} selectedPhrase={selectedPhrase} />
                </Col>
            ))}
        </Row>
    </div>
);
