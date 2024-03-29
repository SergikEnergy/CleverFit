import { FC, Fragment, useContext, useLayoutEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Divider, Empty, Select } from 'antd';
import moment from 'moment';

import { DrawerTrainsContext } from '../../../../react-contexts';
import { ExerciseItem } from '..';

import { ActionsButtons } from './actions-button/actions-buttons';
import { ModalSelectExercisePropsType } from './modal-select-exercise.types';

import classes from './modal-select-exercise.module.css';

import EmptyImg from '/images/EmptyImg.svg';

export const ModalSelectExercise: FC<ModalSelectExercisePropsType> = ({
    changeMode,
    allowedTrains,
    existingTrains,
    trains,
    date,
    trainForEdit,
    closeModal: closeTrainModal,
}) => {
    const {
        exercises,
        changeEditedTrainData,
        setDrawerTitle,
        updateDate,
        trainName,
        setTrainName,
        openDrawer,
        setExercises,
    } = useContext(DrawerTrainsContext);

    const isPastDate = date.isSameOrBefore(moment());
    const [isEditDisabled, setIsEditDisabled] = useState(false);
    const [trainSelect, setTrainSelect] = useState(trainForEdit.length > 0 ? trainForEdit : '');

    useLayoutEffect(() => {
        if (date) {
            updateDate(date);
        }
        if (trainForEdit) {
            if (trains.length > 0) {
                const trainsOnThisDate = trains.filter((elem) => elem.name === trainForEdit);

                if (Array.isArray(trainsOnThisDate) && trainsOnThisDate.length > 0) {
                    setExercises(trainsOnThisDate[0].exercises, trainForEdit);
                    setIsEditDisabled(trainsOnThisDate[0].isImplementation);
                }
            }
        }
    }, [trainForEdit, trains, date, updateDate, setExercises]);

    const onSelectChange = (value: string) => {
        if (value) {
            if (trainSelect !== value) {
                if (!isPastDate) {
                    changeEditedTrainData('', '');
                }
                setTrainSelect(value);

                if (trains.length > 0) {
                    const trainsOnThisDate = trains.filter((elem) => elem.name === value);

                    if (Array.isArray(trainsOnThisDate) && trainsOnThisDate.length > 0) {
                        setExercises(trainsOnThisDate[0].exercises, value);
                        if (isPastDate) {
                            changeEditedTrainData(trainsOnThisDate[0]._id, value);
                        }
                    }
                }
            }
        }
    };

    const openDrawerNewExercise = () => {
        setDrawerTitle('Добавление упражнений');
        if (trainName !== trainSelect) {
            setTrainName(trainSelect);
        }
        openDrawer();
    };

    const allowedOptions: Array<{ value: string; label: string }> = allowedTrains.map((elem) => ({
        value: elem.name,
        label: elem.name,
    }));

    const existingOptions: Array<{ value: string; label: string }> = existingTrains.map((elem) => ({
        value: elem.name,
        label: elem.name,
    }));

    const exercisesFilteredBySelect = exercises
        ? exercises.filter((elem) => elem.name === trainSelect)
        : [];

    return (
        <Fragment>
            <div className={classes.header}>
                <div
                    role='button'
                    aria-label='close-select-exercise'
                    tabIndex={0}
                    className={classes.close}
                    data-test-id='modal-exercise-training-button-close'
                    onKeyDown={() => {}}
                    onClick={() => {
                        changeMode();
                    }}
                >
                    <ArrowLeftOutlined style={{ color: '#262626' }} />
                </div>
                <div className={classes.select}>
                    <Select
                        data-test-id='modal-create-exercise-select'
                        defaultValue={trainForEdit || null}
                        placeholder='Выбор типа тренировки'
                        optionFilterProp='children'
                        onChange={onSelectChange}
                        filterOption={(input, option) =>
                            (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
                        }
                        options={isPastDate ? existingOptions : allowedOptions}
                    />
                </div>
            </div>
            <Divider style={{ marginTop: 10, marginBottom: 12 }} />
            {trainSelect && exercisesFilteredBySelect.length > 0 ? (
                <ul className={classes.exercises__list}>
                    {exercisesFilteredBySelect[0].exercises.map((exercise, index) => (
                        <ExerciseItem
                            disabledIcon={isEditDisabled}
                            index={index}
                            exercise={exercise}
                            key={exercise.name}
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
            <ActionsButtons
                trainSelect={trainSelect}
                trainForEdit={trainForEdit}
                openDrawerNewExercise={openDrawerNewExercise}
                date={date}
                closeTrainModal={closeTrainModal}
            />
        </Fragment>
    );
};
