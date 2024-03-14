import { FC, useState, useContext, useLayoutEffect } from 'react';
import { IAllowedTrainResponse, ITrainingsResponse } from '@redux/API/api-types';
import { Divider, Button, Select, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ErrorAddTrain } from '@components/errorAddTrain';
import { DrawerTrainsContext } from '../../../reactContexts/drawerTrains-context';
import { ModalReportContext } from '../../../reactContexts/modalReport-context';
import { ExerciseItem } from '.';
import { Moment } from 'moment';
import EmptyImg from '/images/EmptyImg.svg';
import { useAddNewTrainMutation, useChangeTrainMutation } from '@redux/API/calendarAPI';
import { NewTrainRequestType } from '@redux/API/api-types';
import classes from './ModalSelectExercise.module.css';

interface IModalSelectExercise {
    changeMode: () => void;
    allowedTrains: IAllowedTrainResponse[];
    trains: [] | ITrainingsResponse[];
    date: Moment;
    trainForEdit: string;
    closeModal: () => void;
}

export const ModalSelectExercise: FC<IModalSelectExercise> = ({
    changeMode,
    allowedTrains,
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
        };

        try {
            await postNewTrain(bodyRequest).unwrap();
            resetExercises();
        } catch (error) {
            if (error) {
                console.log(error);
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
        };
        const idRequest = editedTrainID;

        try {
            console.log({ body: bodyRequest, id: idRequest });
            await updateTrainById({ body: bodyRequest, id: idRequest }).unwrap();
            resetExercises();
            changeEditedTrainData('', '');
        } catch (error) {
            if (error) {
                console.log(error);
                resetExercises();
                closeTrainModal();
                setWidthModal('clamp(328px, 100%, 416px)');
                setNode(<ErrorAddTrain />);
                openModal();
            }
        }
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
                }
            }
        }
        console.log('useffect edit train worked');
    }, [trainForEdit, trains, date]);

    const onSelectChange = (value: string) => {
        if (value && trainSelect !== value) {
            changeEditedTrainData('', '');
            setTrainSelect(value);

            if (trains.length > 0) {
                const trainsOnThisDate = trains.filter((elem) => elem.name === value);
                if (Array.isArray(trainsOnThisDate) && trainsOnThisDate.length > 0) {
                    setExercises(trainsOnThisDate[0].exercises, value);
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
                    onClick={() => {
                        changeMode();
                    }}
                >
                    <ArrowLeftOutlined style={{ color: '#262626' }} />
                </div>
                <div className={classes.select}>
                    <Select
                        defaultValue={trainForEdit ? trainForEdit : null}
                        placeholder='Выбор типа тренировки'
                        optionFilterProp='children'
                        onChange={onSelectChange}
                        filterOption={(input, option) =>
                            (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
                        }
                        options={allowedOptions}
                    />
                </div>
            </div>
            <Divider style={{ marginTop: 10, marginBottom: 12 }} />
            {trainSelect && exercisesFilteredBySelect.length > 0 ? (
                <ul className={classes['exercises__list']}>
                    {exercisesFilteredBySelect[0].exercises.map((exercise) => (
                        <ExerciseItem exercise={exercise} key={exercise.name} />
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
                    // loading={true}
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
};
