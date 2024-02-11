import { FC, ReactNode, useContext } from 'react';

import { CollapsedContext } from '../../reactContexts/collapse-context';

import classes from './cardMainAction.module.css';

type CardMainActionProps = {
    body: string;
    action: ReactNode;
};

export const CardMainAction: FC<CardMainActionProps> = ({ body, action }) => {
    const { collapsed } = useContext(CollapsedContext);

    return (
        <div className={!collapsed ? classes.card : `${classes.card} ${classes.collapsed}`}>
            <div className={!collapsed ? classes.body : `${classes.body} ${classes.collapsed}`}>
                {body}
            </div>
            <div className={classes.action}>{action}</div>
        </div>
    );
};
