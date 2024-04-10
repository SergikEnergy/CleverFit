import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TrainingsResponseType } from '@redux/api/api-types';
import { dateDayMonthYearDotFormat } from '@utils/constants/date-formats';
import { getColorTrainByName } from '@utils/get-color-badge-by-name';
import { getPeriodByValue } from '@utils/get-period';
import { Badge, Button, Divider } from 'antd';
import moment from 'moment';

import { WORKOUT_DATA_TEST_ID } from '../../../data/data-test-ids';

import classes from './custom-overlay-message.module.css';

type CustomOverlayMessagePropsType = {
    training: TrainingsResponseType;
    closeAction: () => void;
};

export const CustomOverlayMessage: FC<CustomOverlayMessagePropsType> = ({
    training,
    closeAction,
}) => {
    const date = moment(training.date).format(dateDayMonthYearDotFormat);

    return (
        <div
            className={classes.overlay}
            data-test-id={WORKOUT_DATA_TEST_ID.jointTrainingReviewCard}
        >
            <div className={classes.header}>
                <Badge
                    className={classes.name}
                    text={training.name}
                    color={getColorTrainByName(training.name)}
                />
                <Button
                    type='text'
                    className={classes.close}
                    icon={<CloseOutlined style={{ color: '#262626' }} />}
                    onClick={closeAction}
                />
            </div>
            <Divider style={{ margin: 0, marginBottom: 24 }} />
            <div className={classes.body}>
                <div className={classes.period}>
                    {training.parameters && training.parameters.period && (
                        <div className={classes.interval}>
                            {getPeriodByValue(training.parameters.period)}
                        </div>
                    )}
                    <div className={classes.date}>{date}</div>
                </div>
                <div className={classes.exercises__list}>
                    {training.exercises.map((exercise, index) => (
                        <div key={`${exercise.name}-${index + 1}`} className={classes.exercise}>
                            <div className={classes.train}>{exercise.name}</div>
                            {exercise.weight && (
                                <div
                                    className={classes.info}
                                >{`${exercise.approaches}\u00A0x\u00A0(${exercise.weight}\u00A0кг)`}</div>
                            )}
                            {!exercise.weight && (
                                <div
                                    className={classes.info}
                                >{`${exercise.approaches}\u00A0x\u00A0(${exercise.replays})`}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
