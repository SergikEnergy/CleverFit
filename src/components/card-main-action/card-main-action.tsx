import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import { useCollapseContext } from '../../react-contexts';

import classes from './card-main-action.module.css';

type CardMainActionProps = {
    body: string;
    action: ReactNode;
};

export const CardMainAction: FC<CardMainActionProps> = ({ body, action }) => {
    const { collapsed } = useCollapseContext();

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
