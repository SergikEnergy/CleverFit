import {
    EditOrCreateModeType,
    StatusSubmitType,
} from '../../react-contexts/trainings-drawer-context';

export type TrainOrExerciseModeType = 'train' | 'exercise';

export const TRAIN_MODE: TrainOrExerciseModeType = 'train';

export const EXERCISE_MODE: TrainOrExerciseModeType = 'exercise';

export const DRAWER_EDIT_MODE: EditOrCreateModeType = 'edit';

export const DRAWER_CREATE_MODE: EditOrCreateModeType = 'create';

export const DRAWER_ADD_MODE: EditOrCreateModeType = 'add';

export const SUBMIT_TRAIN_SUCCESS: StatusSubmitType = 'success';

export const SUBMIT_TRAIN_ERROR: StatusSubmitType = 'error';
