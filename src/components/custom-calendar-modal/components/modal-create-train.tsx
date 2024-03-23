import { FC, Fragment, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TrainingsResponseType } from '@redux/api/api-types';
import { dateDayMonthYearDotFormat } from '@utils/constants/date-formats';
import { TRAIN_PER_DAY_MAX } from '@utils/constants/trainings-frames';
import { Button, Divider, Empty } from 'antd';
import moment, { Moment } from 'moment';

import { TrainWithBadge } from '.';

import classes from './modal-create-train.module.css';

import EmptyImg from '/images/EmptyImg.svg';

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
        <Fragment>
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
                    role='button'
                    aria-label='close create train modal'
                    tabIndex={0}
                    onKeyDown={() => {}}
                    className={classes.close}
                    data-test-id='modal-create-training-button-close'
                    onClick={closeModal}
                >
                    <CloseOutlined />
                </div>
            </div>
            {trains.length > 0 ? (
                <ul className={classes.trains__list}>
                    {trains.map((train, index) => (
                        <TrainWithBadge
                            changeFlowToEdit={changeMode}
                            train={train}
                            key={`${train.name} badged`}
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
                    block={true}
                    className={classes.button__edit}
                    onClick={() => {
                        changeMode();
                    }}
                >
                    {buttonText}
                </Button>
            </div>
        </Fragment>
    );
};
