import { FC, useContext } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { getColorTrainByName } from '@components/calendar-with-data/calendar-with-data.utils';
import { TrainingsResponseType } from '@redux/api/api-types';
import { Badge, Button } from 'antd';
import classnames from 'classnames';

import { DrawerTrainsContext } from '../../../react-contexts';

import classes from './train-with-badge.module.css';

type TrainWithBadgePropsType = {
    train: TrainingsResponseType;
    index: number;
    changeFlowToEdit: () => void;
};

export const TrainWithBadge: FC<TrainWithBadgePropsType> = ({ train, changeFlowToEdit, index }) => {
    const { changeEditedTrainData } = useContext(DrawerTrainsContext);
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
