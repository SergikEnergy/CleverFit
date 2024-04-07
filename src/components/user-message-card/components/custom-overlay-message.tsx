import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TrainingsResponseType } from '@redux/api/api-types';
import { getColorTrainByName } from '@utils/get-color-badge-by-name';
import { Badge, Button, Divider } from 'antd';
import moment from 'moment';

import classes from './custom-overlay.module.css';

type CustomOverlayMessagePropsType = {
    training: TrainingsResponseType;
    closeAction: () => void;
};

export const CustomOverlayMessage: FC<CustomOverlayMessagePropsType> = ({
    training,
    closeAction,
}) => {
    return (
        <div className={classes.overlay}>
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
            <Divider
                style={{
                    marginTop: 0,
                    marginBottom: 16,
                    borderColor: `${getColorTrainByName(training.name)}`,
                }}
            />
            <ul className={classes.exercises__list}>
                {training.exercises.map((exercise, index) => (
                    <li key={`${exercise.name}-${index + 1}`} className={classes.exercise}>
                        {exercise.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
