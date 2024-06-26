import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { TrainingsResponseType } from '@redux/api/api-types';
import { getColorTrainByName } from '@utils/get-color-badge-by-name';
import { Badge, Button } from 'antd';
import classnames from 'classnames';

import { useCalendarTrainingsDrawerContext } from '../../../react-contexts';

import classes from './train-with-badge.module.css';

type TrainWithBadgePropsType = {
    train: TrainingsResponseType;
    index: number;
    changeFlowToEdit: () => void;
};

export const TrainWithBadge: FC<TrainWithBadgePropsType> = ({ train, changeFlowToEdit, index }) => {
    const { changeEditedTrainData } = useCalendarTrainingsDrawerContext();
    const handleEditClick = () => {
        if (!train.isImplementation) {
            changeEditedTrainData(train._id, train.name);
            changeFlowToEdit();
        }
    };

    return (
        <li className={classes.train}>
            <Badge
                className={classnames(classes.badge, {
                    [classes.implemented]: train.isImplementation,
                })}
                color={getColorTrainByName(train.name)}
                text={train.name}
            />

            <Button
                type='text'
                onClick={handleEditClick}
                className={classnames(classes.highlighter, {
                    [classes.implemented]: train.isImplementation,
                })}
                disabled={!!train.isImplementation}
                data-test-id={`modal-update-training-edit-button${index}`}
                icon={
                    <EditOutlined
                        className={classes.edit__icon}
                        disabled={!!train.isImplementation}
                        style={{
                            textAlign: 'right',
                            color: `${train.isImplementation ? 'gray' : 'blue'}`,
                        }}
                    />
                }
            />
        </li>
    );
};
