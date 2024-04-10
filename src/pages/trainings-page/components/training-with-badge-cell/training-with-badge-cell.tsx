import { FC, useRef } from 'react';
import { TrainingsResponseType } from '@redux/api/api-types';
import { getColorTrainByName } from '@utils/get-color-badge-by-name';
import { Badge } from 'antd';
import classnames from 'classnames';

import { TrainingsInfoPopover } from '../trainings-info-popup';

import classes from './training-with-badge-cell.module.css';

type TrainingCellPropsType = {
    training: TrainingsResponseType;
    isImplemented: boolean;
};

type TrainingBadgePropsType = {
    trainingName: string;
    isImplemented: boolean;
};

export const TrainingsBadge: FC<TrainingBadgePropsType> = ({ trainingName, isImplemented }) => (
    <Badge
        className={classnames(classes.badge, {
            [classes.implemented]: isImplemented,
        })}
        color={getColorTrainByName(trainingName)}
        text={null}
    />
);

export const TrainingCell: FC<TrainingCellPropsType> = ({ training, isImplemented }) => {
    const refContainerPopover = useRef<HTMLDivElement>(null);

    return (
        <div className={classes.training} ref={refContainerPopover}>
            <p className={classnames(classes.name, { [classes.implemented]: isImplemented })}>
                {training.name}
            </p>
            <TrainingsInfoPopover
                parentRef={refContainerPopover}
                key={`${training.date}-popover`}
                training={training}
            />
        </div>
    );
};
