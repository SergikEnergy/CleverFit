import { FC } from 'react';
import { PartnersCard } from '@components/partners-card';
import { useWindowWidth } from '@hooks/use-window-size';
import { PartnersResponseType } from '@redux/api/api-types';
import { Col, Row } from 'antd';

import { useCollapseContext } from '../../../../react-contexts';

import classes from './partners-cards.module.css';

type PartnersCardsPropsType = {
    partners: PartnersResponseType[];
    selectedPhrase: string;
};

export const PartnersCards: FC<PartnersCardsPropsType> = ({ partners, selectedPhrase }) => {
    const { collapsed } = useCollapseContext();
    const innerWidth = useWindowWidth();
    let colWidth = '25%';

    if (collapsed && innerWidth > 1100) colWidth = '20%';
    if (innerWidth < 1100 && innerWidth > 550) colWidth = '240px';
    if (innerWidth <= 550) colWidth = '80%';
    if (innerWidth <= 450) colWidth = '100%';

    return (
        <div className={classes.cards}>
            <Row
                style={{ width: '100%' }}
                gutter={[16, 16]}
                justify={innerWidth > 550 ? 'start' : 'center'}
            >
                {partners.map((partner, index) => (
                    <Col style={{ width: colWidth }} key={`${partner}-${index + 1}`}>
                        <PartnersCard
                            partner={partner}
                            index={index}
                            selectedPhrase={selectedPhrase}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
