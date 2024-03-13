import { FC, useState, useContext, useEffect } from 'react';
import { IAllowedTrainResponse, ITrainingsResponse } from '@redux/API/api-types';
import { ModalModeType } from '../CustomCalendarModal';
import { Divider, Button, Select, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DrawerTrainsContext } from '../../../reactContexts/drawerTrains-context';
import { ExerciseItem } from '.';
import moment, { Moment } from 'moment';
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
    date,
}) => {
    const [trainSelect, setTrainSelect] = useState('');
    const [activeTrains, setActiveTrains] = useState<ITrainingsResponse[]>([]);
    const {
        exercises,
        setDrawerTitle,
        updateDate,
        trainName,
        setTrainName,
        openDrawer,
        setExercises,
    } = useContext(DrawerTrainsContext);

    useEffect(() => {
        const filteredTrains = trains.filter(
            (train) => moment(train.date).format('YYYY-DD-MM') === date.format('YYYY-DD-MM'),
        );
        if (Array.isArray(filteredTrains) && filteredTrains.length > 0) {
            setActiveTrains(filteredTrains);
        }
    }, []);

    const onSelectChange = (value: string) => {
        if (value) {
            setTrainSelect(value);

            if (activeTrains.length > 0) {
                const trainsOnThisDate = activeTrains.filter((elem) => elem.name === value);
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
                            (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
                        }
                        options={allowedOptions}
                    />
                </div>
            </div>
            <Divider style={{ marginTop: 10, marginBottom: 12 }} />
            {trainSelect &&
            exercises.length > 0 &&
            exercises.filter((elem) => elem.name === trainSelect)[0] ? (
                <ul className={classes['exercises__list']}>
                    {exercises
                        .filter((elem) => elem.name === trainSelect)[0]
                        .exercises.map((exercise) => (
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
                    disabled={exercises.length === 0 || !trainSelect}
                    block
                    className={classes['button__save']}
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
};
