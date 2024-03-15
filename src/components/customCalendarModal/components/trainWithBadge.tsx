import { FC, useContext } from 'react';
import { ITrainingsResponse } from '@redux/API/api-types';
import { DrawerTrainsContext } from '../../../reactContexts/drawerTrains-context';
import { Badge } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getColorTrainByName } from '@components/calendarWithData/CalendarWithData.utils';

import classes from './TrainWithBadge.module.css';
import classnames from 'classnames';

interface TrainWithBadgeProps {
    train: ITrainingsResponse;
    index: number;
    changeFlowToEdit: () => void;
}

export const TrainWithBadge: FC<TrainWithBadgeProps> = ({ train, changeFlowToEdit, index }) => {
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
            <EditOutlined
                data-test-id={`modal-update-training-edit-button${index}`}
                onClick={handleEditClick}
                style={train.isImplementation ? { color: 'gray' } : { color: 'blue' }}
                className={classnames(classes.highlighter, {
                    [classes.implemented]: train.isImplementation,
                })}
            />
        </li>
    );
};
