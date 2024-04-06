import { FC } from 'react';
import { CheckCircleFilled, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { UserTrainingInfoLine } from '@components/user-training-info-line';
import { PartnersResponseType } from '@redux/api/api-types';
import { INVITE_STATUS } from '@utils/constants/statuses-invitation';
import { DRAWER_JOIN_MODE } from '@utils/constants/train-modes';
import { getHighlightedName } from '@utils/get-highlighted-name';
import { Avatar, Button, Card } from 'antd';
import classnames from 'classnames';

import { useTrainingsDrawerContext } from '../../react-contexts';

import classes from './partners-card.module.css';

type PartnersCardType = {
    partner: PartnersResponseType;
    index: number;
    selectedPhrase: string;
};

export const PartnersCard: FC<PartnersCardType> = ({ partner, index, selectedPhrase }) => {
    const { avgWeightInWeek, status, trainingType, imageSrc, name, id: partnerId } = partner;
    const { changeMode, changeActivePartnerTrainingId, openDrawer } = useTrainingsDrawerContext();
    const isApproved = status === INVITE_STATUS.accepted;
    const isRejected = status === INVITE_STATUS.rejected;
    const isPending = status === INVITE_STATUS.pending;
    const buttonText = (isApproved && 'Отменить тренировку') || 'Создать тренировку';

    const addPartnerClickHandler = () => {
        changeMode(DRAWER_JOIN_MODE);
        changeActivePartnerTrainingId(partnerId);
        openDrawer();
    };

    return (
        <Card className={classes.partner}>
            <Card.Meta
                title={getHighlightedName(name, selectedPhrase)}
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
            <Button
                disabled={isRejected || isPending}
                onClick={addPartnerClickHandler}
                type={isApproved ? 'default' : 'primary'}
                className={classnames(classes.button, {
                    [classes.default]: isApproved,
                    [classes.primary]: isRejected,
                })}
            >
                {buttonText}
            </Button>
            <div className={classes.label}>
                {isApproved && <span>тренировка одобрена</span>}
                {isRejected && <span>тренировка отклонена</span>}
                {isPending && <span>ожидает подтверждения</span>}
                {(isApproved || isRejected) && (
                    <span>
                        {isApproved && <CheckCircleFilled style={{ color: '#52C41A' }} />}
                        {isRejected && <InfoCircleOutlined />}
                    </span>
                )}
            </div>
        </Card>
    );
};
