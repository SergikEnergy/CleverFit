import { FC } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TrainingsResponseType } from '@redux/api/api-types';
import { getColorTrainByName } from '@utils/get-color-badge-by-name';
import { Badge, Button } from 'antd';
import classnames from 'classnames';

import classes from './training-with-badge-cell.module.css';

type TrainingCellPropsType = {
    training: TrainingsResponseType;
    isImplemented: boolean;
    clickAction: () => void;
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

export const TrainingCell: FC<TrainingCellPropsType> = ({
    training,
    isImplemented,
    clickAction,
}) => (
    <div className={classes.training}>
        <p className={classnames(classes.name, { [classes.implemented]: isImplemented })}>
            {training.name}
        </p>
        <Button type='text' icon={<DownOutlined />} onClick={clickAction} />
    </div>
);
