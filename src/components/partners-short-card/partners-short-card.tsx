import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { TrainingPartnerModal } from '@components/training-partner-modal';
import { UserTrainingInfoLine } from '@components/user-training-info-line';
import { PartnersResponseType } from '@redux/api/api-types';
import { Avatar, Card } from 'antd';

import { useModalReportContext } from '../../react-contexts';

import classes from './partners-short-card.module.css';

type PartnersCardType = {
    partner: PartnersResponseType;
    index: number;
};

export const PartnersShortCard: FC<PartnersCardType> = ({ partner, index }) => {
    const { avgWeightInWeek, trainingType, imageSrc, name } = partner;
    const { setNode, setWidthModal, openModal } = useModalReportContext();

    const handleOpenCardModal = () => {
        setNode(<TrainingPartnerModal user={partner} />);
        setWidthModal('clamp(312px, 100%, 539px)');
        openModal();
    };

    return (
        <Card
            className={classes.partner}
            data-test-id={`joint-training-cards${index}`}
            onClick={handleOpenCardModal}
        >
            <Card.Meta
                title={name}
                avatar={
                    imageSrc ? <Avatar src={imageSrc} /> : <UserOutlined style={{ fontSize: 32 }} />
                }
            />
            <div className={classes.info}>
                <UserTrainingInfoLine
                    key='type'
                    title='Тип тренировки'
                    description={trainingType}
                />
                <UserTrainingInfoLine
                    key='avrgWeight'
                    title='Средняя нагрузка'
                    description={`${avgWeightInWeek} кг/нед`}
                />
            </div>
        </Card>
    );
};
