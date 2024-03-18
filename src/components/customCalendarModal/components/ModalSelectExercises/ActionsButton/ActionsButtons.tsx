import { FC, useContext } from 'react';
import { DrawerTrainsContext, ModalReportContext } from '../../../../../reactContexts';
import { NewTrainRequestType } from '@redux/API/api-types';
import moment, { Moment } from 'moment';
import { useAddNewTrainMutation, useChangeTrainMutation } from '@redux/API/calendarAPI';
import { ErrorAddTrain } from '@components/errorAddTrain';

import { Button } from 'antd';
import classes from './ActionsButtons.module.css';

type ActionsButtonsPropsType = {
    trainSelect: string;
    trainForEdit: string;
    openDrawerNewExercise: () => void;
    date: Moment;
    closeTrainModal: () => void;
};

export const ActionsButtons: FC<ActionsButtonsPropsType> = ({
    trainSelect,
    trainForEdit,
    openDrawerNewExercise,
    date,
    closeTrainModal,
}) => {
    const isPastDate = date.isSameOrBefore(moment());

    const { exercises, resetExercises, changeEditedTrainData, editedTrainID } =
        useContext(DrawerTrainsContext);

    const { openModal, setNode, setWidthModal } = useContext(ModalReportContext);

    const [postNewTrain, { isLoading: isPostingTrain }] = useAddNewTrainMutation();

    const [updateTrainById, { isLoading: isUpdateTrainLoading }] = useChangeTrainMutation();

    const exercisesFilteredBySelect = exercises
        ? exercises.filter((elem) => elem.name === trainSelect)
        : [];

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

    const handleSaveExercisesClick = () => {
        addNewTrain();
    };

    const handleUpdateTrainClick = () => {
        updateSelectedTrain();
    };

    return (
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
    );
};
