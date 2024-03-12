import { FC, useState, useContext } from 'react';
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
    const { exercises, setDrawerTitle, updateDate, setTrainName, openDrawer } =
        useContext(DrawerTrainsContext);

    const onSelectChange = (value: string) => {
        setTrainSelect(value);
    };

    const openDrawerNewExercise = () => {
        setDrawerTitle('Добавление упражнений');
        setTrainName(trainSelect);
        updateDate(date);
        openDrawer();
    };

    const allowedOptions: { value: string; label: string }[] = allowedTrains.map((elem) => ({
        value: elem.name,
        label: elem.name,
    }));
    const filteredTrains = trains.filter(
        (train) =>
            train.name.toLowerCase() === trainSelect &&
            moment(train.date).format('YYYY-DD-MM') === date.format('YYYY-DD-MM'),
    );
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
            {trainSelect && exercises.length > 0 ? (
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
                    disabled={!trainSelect && exercises.length === 0}
                    block
                    className={classes['button__save']}
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
};
