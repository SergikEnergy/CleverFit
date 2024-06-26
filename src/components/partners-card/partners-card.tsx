import { FC } from 'react';
import { CheckCircleFilled, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { UserTrainingInfoLine } from '@components/user-training-info-line';
import { PartnersResponseType } from '@redux/api/api-types';
import { useRejectInvitationMutation } from '@redux/api/invitations-api';
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
    colorBgModal?: string;
};

export const PartnersCard: FC<PartnersCardType> = ({
    partner,
    index,
    selectedPhrase,
    colorBgModal,
}) => {
    const [declineUserTraining] = useRejectInvitationMutation();
    const { avgWeightInWeek, status, trainingType, imageSrc, name, id: partnerId } = partner;
    const { changeMode, changeActivePartnerTrainingId, openDrawer, changeActiveTrainingId } =
        useTrainingsDrawerContext();
    const isApproved = status === INVITE_STATUS.accepted;
    const isRejected = status === INVITE_STATUS.rejected;
    const isPending = status === INVITE_STATUS.pending;
    const buttonText = (isApproved && 'Отменить тренировку') || 'Создать тренировку';

    const addPartnerClickHandler = () => {
        changeActivePartnerTrainingId(partnerId);
        changeActiveTrainingId('');
        changeMode(DRAWER_JOIN_MODE);
        openDrawer();
    };

    const cancelTrainingHandler = () => declineUserTraining({ id: partner.inviteId });
    const bgCardColor = colorBgModal || (partner.status === 'rejected' ? '#FAFAFA' : '#F0F5FF');

    return (
        <Card
            style={{ backgroundColor: bgCardColor, border: colorBgModal && 'none' }}
            className={classes.partner}
            data-test-id={`joint-training-cards${index}`}
        >
            <Card.Meta
                title={getHighlightedName(name, selectedPhrase)}
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

            <Button
                disabled={isRejected || isPending}
                onClick={isApproved ? cancelTrainingHandler : addPartnerClickHandler}
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
