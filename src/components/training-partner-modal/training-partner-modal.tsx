import { FC } from 'react';
import { CheckCircleFilled, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { ErrorAddTrain } from '@components/error-add-train';
import { UserTrainingInfoLine } from '@components/user-training-info-line';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { PartnersResponseType } from '@redux/api/api-types';
import { useRejectInvitationMutation } from '@redux/api/invitations-api';
import { changeTrainingsMode, deleteMyPartner } from '@redux/reducers/trainings-partners-slice';
import { INVITE_STATUS } from '@utils/constants/statuses-invitation';
import { Avatar, Button } from 'antd';

import { useModalReportContext } from '../../react-contexts';

import classes from './training-partner-modal.module.css';

type TrainingPartnerModalPropsType = {
    user: PartnersResponseType;
};

export const TrainingPartnerModal: FC<TrainingPartnerModalPropsType> = ({ user }) => {
    const dispatch = useAppDispatch();
    const { avgWeightInWeek, status, trainingType, imageSrc, name, inviteId } = user;
    const { closeModal, openModal, setWidthModal, setNode } = useModalReportContext();

    const [declineUserTraining] = useRejectInvitationMutation();

    const isApproved = status === INVITE_STATUS.accepted;
    const buttonText = 'Отменить тренировку';

    const closeHandler = () => closeModal();

    const cancelTrainingHandler = async () => {
        try {
            await declineUserTraining({ id: inviteId }).unwrap();
            dispatch(deleteMyPartner({ id: user.id }));

            dispatch(changeTrainingsMode('user'));
            closeModal();
        } catch (err) {
            closeModal();
            setNode(<ErrorAddTrain />);
            setWidthModal('clamp(312px, 100%, 539px)');
            openModal();
        }
    };

    return (
        <div className={classes.modal} style={{ backgroundColor: '#FAFAFA' }}>
            <Button
                type='text'
                icon={<CloseOutlined style={{ fontSize: 14, color: '#8C8C8C' }} />}
                className={classes.close}
                onClick={closeHandler}
            />
            <div className={classes.details}>
                <div className={classes.user}>
                    <div className={classes.avatar}>
                        {imageSrc ? (
                            <Avatar src={imageSrc} />
                        ) : (
                            <UserOutlined style={{ fontSize: 32 }} />
                        )}
                    </div>
                    <div className={classes.name}>{name}</div>
                </div>

                <div className={classes.info}>
                    <div className={classes.line}>
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
                </div>
            </div>
            <div className={classes.status}>
                <Button
                    disabled={!isApproved}
                    onClick={cancelTrainingHandler}
                    type='default'
                    className={classes.button}
                >
                    {buttonText}
                </Button>
                <div className={classes.label}>
                    {isApproved && <span>тренировка одобрена</span>}
                    <CheckCircleFilled style={{ color: '#52C41A' }} />
                </div>
            </div>
        </div>
    );
};
