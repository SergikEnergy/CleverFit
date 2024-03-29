import { FC, ReactNode, useContext } from 'react';
import classnames from 'classnames';

import { CollapsedContext } from '../../react-contexts';

import classes from './card-main-action.module.css';

type CardMainActionProps = {
    body: string;
    action: ReactNode;
};

export const CardMainAction: FC<CardMainActionProps> = ({ body, action }) => {
    const { collapsed } = useContext(CollapsedContext);

    return (
        <div className={classnames(classes.card, { [classes.collapsed]: collapsed })}>
            <div
                className={classnames(classes.body, classes.antFixed, {
                    [classes.collapsed]: collapsed,
                })}
            >
                {body}
            </div>
            <div className={classes.action}>{action}</div>
        </div>
    );
};
