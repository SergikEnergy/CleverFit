import { FC, useState, useContext } from 'react';
import { IAllowedTrainResponse, ITrainingsResponse } from '@redux/API/api-types';
import { Divider, Button, Select, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ErrorAddTrain } from '@components/errorAddTrain';
import { DrawerTrainsContext } from '../../../reactContexts/drawerTrains-context';
import { ModalReportContext } from '../../../reactContexts/modalReport-context';
import { ExerciseItem } from '.';
import { Moment } from 'moment';
import EmptyImg from '/images/EmptyImg.svg';
import { useAddNewTrainMutation } from '@redux/API/calendarAPI';
import { NewTrainRequestType } from '@redux/API/api-types';
import classes from './ModalSelectExercise.module.css';

interface IModalSelectExercise {
    changeMode: () => void;
    allowedTrains: IAllowedTrainResponse[];
    trains: [] | ITrainingsResponse[];
    date: Moment;
    closeModal: () => void;
}

export const ModalSelectExercise: FC<IModalSelectExercise> = ({
    changeMode,
    allowedTrains,
    trains,
    date,
    closeModal: closeTrainModal,
}) => {
    const [postNewTrain, { isLoading: isPostingTrain }] = useAddNewTrainMutation();
    const [trainSelect, setTrainSelect] = useState('');
    const {
        exercises,
        setDrawerTitle,
        updateDate,
        trainName,
        setTrainName,
        openDrawer,
        setExercises,
        resetExercises,
    } = useContext(DrawerTrainsContext);
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
            // changeMode();
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

    const onSelectChange = (value: string) => {
        if (value && trainSelect !== value) {
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
        updateDate(date);
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
                    disabled={!trainSelect}
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
                    onClick={handleSaveExercisesClick}
                    loading={isPostingTrain}
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
};
