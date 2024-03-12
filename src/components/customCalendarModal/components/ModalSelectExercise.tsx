import { FC, useState } from 'react';
import { IAllowedTrainResponse, ITrainingsResponse } from '@redux/API/api-types';
import { ModalModeType } from '../CustomCalendarModal';
import { Divider, Button, Select, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ExerciseItem } from '.';
import { Moment } from 'moment';
import EmptyImg from '/images/EmptyImg.svg';

import classes from './ModalSelectExercise.module.css';

interface IModalSelectExercise {
    changeMode: (mode: ModalModeType) => void;
    allowedTrains: IAllowedTrainResponse[];
    trains: [] | ITrainingsResponse[];
    date: Moment;
}

export const ModalSelectExercise: FC<IModalSelectExercise> = ({
    changeMode,
    allowedTrains,
    trains,
}) => {
    const [exercise, setExercise] = useState('');
    const [exercisesList, setExercisesList] = useState([]);

    const onSelectChange = (value: string) => {
        setExercise(value);
    };

    const openDrawerNewExercise = () => {
        //
    };

    const allowedOptions: { value: string; label: string }[] = allowedTrains.map((elem) => ({
        value: elem.name,
        label: elem.name,
    }));
    const filteredTrains = trains.filter((train) => train.name.toLowerCase() === exercise);
    return (
        <>
            <div className={classes.header}>
                <div
                    className={classes.close}
                    onClick={() => {
                        changeMode('exercise');
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
                            (option?.label ?? '').includes(input.toLowerCase())
                        }
                        options={allowedOptions}
                    />
                </div>
            </div>
            <Divider style={{ marginTop: 10, marginBottom: 12 }} />
            {exercise && exercisesList.length > 0 ? (
                <ul className={classes['exercises__list']}>
                    {filteredTrains[0].exercises.map((exercise) => (
                        <ExerciseItem exercise={exercise} key={exercise._id} />
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
                    disabled={!exercise}
                    type='primary'
                    block
                    className={classes['button__add']}
                    onClick={openDrawerNewExercise}
                >
                    Добавить упражнения
                </Button>
                <Button
                    type='default'
                    disabled={!exercise && exercisesList.length === 0}
                    block
                    className={classes['button__save']}
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
};
