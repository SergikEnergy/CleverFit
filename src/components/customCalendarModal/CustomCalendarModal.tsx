import { FC, useState, useEffect } from 'react';
import { Moment } from 'moment';
import { checkNarrowFramesDay } from './CustomCalendarModal.utils';
import { IModalPosition } from '@components/calendarWithData/CalendarWithData.types';
import { ITrainingsResponse } from '@redux/API/api-types';
import { TrainWithBadge } from './components';
import { CloseOutlined } from '@ant-design/icons';
import { Empty, Button, Divider } from 'antd';

import classes from './CustomCalendarModal.module.css';
import classnames from 'classnames';

interface ICustomCalendarModalProps {
    widthModal: string;
    modalPosition: IModalPosition;
    value: Moment;
    trains: [] | ITrainingsResponse[];
    isCentered?: boolean;
    allowOpen: boolean;
    isModalVisible: boolean;
}

export const CustomCalendarModal: FC<ICustomCalendarModalProps> = ({
    allowOpen,
    modalPosition,
    value,
    widthModal,
    isCentered,
    isModalVisible,
    trains,
}) => {
    const topPosition = isCentered
        ? modalPosition.top + modalPosition.heightSelectedCell
        : modalPosition.top;

    const styleForCenteredPosition = {
        width: widthModal,
        top: topPosition,
        left: 24,
        zIndex: 11,
    };
    const styleForOtherPosition =
        checkNarrowFramesDay(value.day()).side === 'left'
            ? {
                  width: widthModal,
                  top: topPosition,
                  left: modalPosition.left,
                  zIndex: 11,
              }
            : {
                  width: widthModal,
                  top: topPosition,
                  right: modalPosition.right,
                  zIndex: 11,
              };

    return (
        <>
            {allowOpen && (
                <div
                    style={
                        isCentered ? { ...styleForCenteredPosition } : { ...styleForOtherPosition }
                    }
                    className={classnames(classes.modal, { [classes.hidden]: !isModalVisible })}
                >
                    <div className={classes.header}>
                        <div className={classes.content}>
                            <div className={classes.title}>{`Тренировки на ${value.format(
                                'DD.MM.YYYY',
                            )}`}</div>
                            {trains.length === 0 && (
                                <div className={classes.subtitle}>Нет активных тренировок</div>
                            )}
                        </div>
                        <div className={classes.close}>
                            <CloseOutlined />
                        </div>
                    </div>
                    {trains.length > 0 ? (
                        <ul className={classes['trains__list']}>
                            {trains.map((train) => (
                                <TrainWithBadge train={train} key={train._id} />
                            ))}
                        </ul>
                    ) : (
                        <div className={classes.empty}>
                            <Empty
                                image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                                imageStyle={{
                                    height: 32,
                                }}
                                description={null}
                            />
                        </div>
                    )}
                    <Divider style={{ marginTop: 12, marginBottom: 12 }} />
                    <div className={classes.buttons}>
                        <Button type='primary' block className={classes['button__edit']}>
                            {trains.length > 0 ? 'Редактировать тренировку' : 'Создать тренировку'}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
