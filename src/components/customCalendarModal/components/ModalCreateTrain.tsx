import { FC, useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { TrainingsResponseType } from '@redux/API/api-types';
import { TrainWithBadge } from '.';
import { CloseOutlined } from '@ant-design/icons';
import { Empty, Button, Divider } from 'antd';
import EmptyImg from '/images/EmptyImg.svg';
import { dateDayMonthYearDotFormat } from '@utils/constants/dateFormats';
import { TRAIN_PER_DAY_MAX } from '@utils/constants/trainings-frames';

import classes from './ModalCreateTrain.module.css';

type ModalCreateTrainPropsType = {
    value: Moment;
    trains: [] | TrainingsResponseType[];
    closeModal: () => void;
    changeMode: () => void;
};

export const ModalCreateTrain: FC<ModalCreateTrainPropsType> = ({
    value,
    trains,
    closeModal,
    changeMode,
}) => {
    const [disabledCreateButton, setDisabledCreateButton] = useState<boolean>(true);

    const isPastDate = value.isSameOrBefore(moment());
    const buttonText =
        !isPastDate || trains.length === 0 ? 'Создать тренировку' : 'Создать тренировку';

    useEffect(() => {
        const isDisabled = value.isSameOrBefore(moment()) || trains.length >= TRAIN_PER_DAY_MAX;
        setDisabledCreateButton(isDisabled);
    }, [value, trains.length]);

    return (
        <>
            <div className={classes.header}>
                <div className={classes.content}>
                    <div className={classes.title}>{`Тренировки на ${value.format(
                        dateDayMonthYearDotFormat,
                    )}`}</div>
                    {trains.length === 0 && (
                        <div className={classes.subtitle}>Нет активных тренировок</div>
                    )}
                </div>
                <div
                    className={classes.close}
                    data-test-id='modal-create-training-button-close'
                    onClick={closeModal}
                >
                    <CloseOutlined />
                </div>
            </div>
            {trains.length > 0 ? (
                <ul className={classes['trains__list']}>
                    {trains.map((train, index) => (
                        <TrainWithBadge
                            changeFlowToEdit={changeMode}
                            train={train}
                            key={`${train.name}+${index}`}
                            index={index}
                        />
                    ))}
                </ul>
            ) : (
                <div className={classes.empty}>
                    <Empty
                        image={EmptyImg}
                        imageStyle={{
                            height: 32,
                        }}
                        description={null}
                    />
                </div>
            )}
            <Divider style={{ marginTop: 12, marginBottom: 12 }} />
            <div className={classes.buttons}>
                <Button
                    disabled={disabledCreateButton}
                    type='primary'
                    block
                    className={classes['button__edit']}
                    onClick={() => {
                        changeMode();
                    }}
                >
                    {buttonText}
                </Button>
            </div>
        </>
    );
};
