import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { UserTrainingInfoLine } from '@components/user-training-info-line';
import { PartnersResponseType } from '@redux/api/api-types';
import { Avatar, Card } from 'antd';

import classes from './partners-short-card.module.css';

type PartnersCardType = {
    partner: PartnersResponseType;
    index: number;
};

export const PartnersShortCard: FC<PartnersCardType> = ({ partner, index }) => {
    const { avgWeightInWeek, trainingType, imageSrc, name } = partner;
    console.log(name, `--${index}--`);

    return (
        <Card className={classes.partner} data-test-id={`joint-training-cards${index}`}>
            <Card.Meta
                title={name}
                avatar={
                    imageSrc ? <Avatar src={imageSrc} /> : <UserOutlined style={{ fontSize: 32 }} />
                }
            />
            <div className={classes.info}>
                <UserTrainingInfoLine
                    index={1}
                    key='type'
                    title='Тип тренировки'
                    description={trainingType}
                />
                <UserTrainingInfoLine
                    index={2}
                    key='avrgWeight'
                    title='Средняя нагрузка'
                    description={`${avgWeightInWeek} кг/нед`}
                />
            </div>
        </Card>
    );
};
