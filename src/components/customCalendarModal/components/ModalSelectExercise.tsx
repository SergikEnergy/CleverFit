import { FC, useState, useContext, useLayoutEffect } from 'react';
import { AllowedTrainResponseType, TrainingsResponseType } from '@redux/API/api-types';
import { Divider, Button, Select, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ErrorAddTrain } from '@components/errorAddTrain';
import { DrawerTrainsContext, ModalReportContext } from '../../../reactContexts';
import { ExerciseItem } from '.';
import { Moment } from 'moment';
import EmptyImg from '/images/EmptyImg.svg';
import { useAddNewTrainMutation, useChangeTrainMutation } from '@redux/API/calendarAPI';
import { NewTrainRequestType } from '@redux/API/api-types';
import moment from 'moment';

import classes from './ModalSelectExercise.module.css';

type ModalSelectExercisePropsType = {
    changeMode: () => void;
    allowedTrains: AllowedTrainResponseType[];
    existingTrains: AllowedTrainResponseType[];
    trains: [] | TrainingsResponseType[];
    date: Moment;
    trainForEdit: string;
    closeModal: () => void;
};

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
        editedTrainID,
        changeEditedTrainData,
        setDrawerTitle,
        updateDate,
        trainName,
        setTrainName,
        openDrawer,
        setExercises,
        resetExercises,
    } = useContext(DrawerTrainsContext);

    const isPastDate = date.isSameOrBefore(moment());

    const [isEditDisabled, setIsEditDisabled] = useState(false);

    const [postNewTrain, { isLoading: isPostingTrain }] = useAddNewTrainMutation();

    const [updateTrainById, { isLoading: isUpdateTrainLoading }] = useChangeTrainMutation();

    const [trainSelect, setTrainSelect] = useState(trainForEdit.length > 0 ? trainForEdit : '');

    const { openModal, setNode, setWidthModal } = useContext(ModalReportContext);

    const addNewTrain = async () => {
        const filterExercisesByName = exercises.filter((elem) => elem.name === trainSelect);
        const exercisesRequest = filterExercisesByName[0].exercises;
        const dateRequest = date.add(3, 'hours').toISOString();
        const nameRequest = trainSelect;
        const bodyRequest: NewTrainRequestType = {
            date: dateRequest,
            name: nameRequest,
            exercises: exercisesRequest,
            isImplementation: false,
        };

        try {
            await postNewTrain(bodyRequest).unwrap();
            resetExercises();
        } catch (error) {
            if (error) {
                resetExercises();
                closeTrainModal();
                setWidthModal('clamp(328px, 100%, 416px)');
                setNode(<ErrorAddTrain />);
                openModal();
            }
        }
    };

    const updateTrainRequestHandler = async (body: NewTrainRequestType, id: string) => {
        try {
            await updateTrainById({ body, id }).unwrap();
            resetExercises();
            changeEditedTrainData('', '');
        } catch (error) {
            if (error) {
                resetExercises();
                closeTrainModal();
                setWidthModal('clamp(328px, 100%, 416px)');
                setNode(<ErrorAddTrain />);
                openModal();
            }
        }
    };

    const updateSelectedTrain = async () => {
        const filterExercisesByName = exercises.filter((elem) => elem.name === trainSelect);
        const exercisesRequest = filterExercisesByName[0].exercises;
        const dateRequest = date.add(3, 'hours').toISOString();
        const nameRequest = trainSelect;
        const bodyRequest: NewTrainRequestType = {
            date: dateRequest,
            name: nameRequest,
            exercises: exercisesRequest,
            isImplementation: isPastDate,
        };
        const idRequest = editedTrainID;
        await updateTrainRequestHandler(bodyRequest, idRequest);
    };

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
    }, [trainForEdit, trains, date]);

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

    const allowedOptions: { value: string; label: string }[] = allowedTrains.map((elem) => ({
        value: elem.name,
        label: elem.name,
    }));

    const existingOptions: { value: string; label: string }[] = existingTrains.map((elem) => ({
        value: elem.name,
        label: elem.name,
    }));

    const exercisesFilteredBySelect = exercises
        ? exercises.filter((elem) => elem.name === trainSelect)
        : [];

    const handleSaveExercisesClick = () => {
        addNewTrain();
    };

    const handleUpdateTrainClick = () => {
        updateSelectedTrain();
    };

    return (
        <>
            <div className={classes.header}>
                <div
                    className={classes.close}
                    data-test-id='modal-exercise-training-button-close'
                    onClick={() => {
                        changeMode();
                    }}
                >
                    <ArrowLeftOutlined style={{ color: '#262626' }} />
                </div>
                <div className={classes.select}>
                    <Select
                        data-test-id='modal-create-exercise-select'
                        defaultValue={trainForEdit ? trainForEdit : null}
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
                <ul className={classes['exercises__list']}>
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
            <div className={classes.buttons}>
                <Button
                    disabled={!trainSelect || !!trainForEdit}
                    type='primary'
                    block
                    className={classes['button__add']}
                    onClick={openDrawerNewExercise}
                >
                    Добавить упражнения
                </Button>
                <Button
                    type='default'
                    disabled={exercisesFilteredBySelect.length === 0 || !trainSelect}
                    block
                    className={classes['button__save']}
                    onClick={trainForEdit ? handleUpdateTrainClick : handleSaveExercisesClick}
                    loading={isPostingTrain || isUpdateTrainLoading}
                >
                    {isPastDate ? 'Сохранить изменения' : 'Сохранить'}
                </Button>
            </div>
        </>
    );
};
