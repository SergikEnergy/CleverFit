import { FC, useLayoutEffect, useState } from 'react';
import { useAddNewTraining } from '@hooks/use-add-new-training';
import { useUpdateUserTraining } from '@hooks/use-update-user-training';
import { useUserTrainingsSelector } from '@redux/selectors';
import { dateFullFormatWithDot, dateFullStringFormat } from '@utils/constants/date-formats';
import { DRAWER_EDIT_MODE } from '@utils/constants/train-modes';
import { Button, Checkbox, DatePicker, Form, Select } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import locale from 'antd/es/date-picker/locale/ru_RU';
import classnames from 'classnames';
import moment, { Moment } from 'moment';

import { WORKOUT_DATA_TEST_ID } from '../../../../../../data/data-test-ids';
import { useTrainingsDrawerContext } from '../../../../../../react-contexts';
import { FormDrawerList } from '../form-drawer-list/form-drawer-list';

import { initialEmptyFormFields, selectPeriodOptions } from './form-drawer.data';
import { FormDrawerPropsType, FormFieldsType } from './form-drawer.types';
import { checkDisabledSubmit, disabledDate, prepareDataRequest } from './form-drawer.utils';
import { DataCellRender } from './form-drawer-cell-render';

import classes from './form-drawer.module.css';

import 'moment/dist/locale/ru';

moment.locale('ru');

export const FormDrawer: FC<FormDrawerPropsType> = () => {
    const [form] = Form.useForm<FormFieldsType>();
    const {
        closeDrawer,
        open: isDrawerOpened,
        activeTrainingId,
        modeDrawer,
    } = useTrainingsDrawerContext();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const { allowedTrainingsList, userTrainings } = useUserTrainingsSelector();
    const addNewUserTrainingRequest = useAddNewTraining();
    const updateUserTrainingInfo = useUpdateUserTraining();
    const activeTraining = userTrainings.filter((elem) => elem._id === activeTrainingId);
    const isShowedPeriodSelect =
        activeTraining.length > 0 && activeTraining[0].parameters
            ? activeTraining[0].parameters.repeat
            : false;
    const [allowSelectPeriod, setAllowSelectPeriod] = useState(isShowedPeriodSelect);

    const initialFormValues =
        activeTraining.length > 0
            ? {
                  exercises: activeTraining[0].exercises.map((exercise) => ({
                      key: exercise.name,
                      name: exercise.name,
                      exercise: exercise.name,
                      replays: exercise.replays,
                      weight: exercise.weight,
                      approaches: exercise.approaches,
                  })),
                  trainingsSelect: activeTraining[0].name,
                  trainingsDate: moment(activeTraining[0].date, dateFullStringFormat),
                  withPeriodActivate: activeTraining[0].parameters
                      ? activeTraining[0].parameters.repeat
                      : false,
                  periodSelect: activeTraining[0].parameters
                      ? activeTraining[0].parameters.period
                      : undefined,
              }
            : initialEmptyFormFields;

    const allowedOptions: Array<{ value: string; label: string }> = allowedTrainingsList.map(
        (elem) => ({
            value: elem.name,
            label: elem.name,
        }),
    );

    if (!isDrawerOpened) {
        form.resetFields();
    }

    useLayoutEffect(() => {
        setIsSubmitDisabled(checkDisabledSubmit(form));
    }, [form]);

    const activateAdditionalSelect = (event: CheckboxChangeEvent) =>
        event.target.checked ? setAllowSelectPeriod(true) : setAllowSelectPeriod(false);

    const finishFunc = async (values: FormFieldsType) => {
        const requestBody = prepareDataRequest(values);

        if (requestBody && modeDrawer !== DRAWER_EDIT_MODE) {
            addNewUserTrainingRequest(requestBody);
        }
        if (requestBody && modeDrawer === DRAWER_EDIT_MODE && activeTraining.length > 0) {
            updateUserTrainingInfo(requestBody, activeTraining[0]._id);
        }

        closeDrawer();
    };

    const formFieldsChangeHandler = () => {
        const isDisabled = checkDisabledSubmit(form);

        setIsSubmitDisabled(isDisabled);
    };

    const dateCellRender = (date: Moment) => <DataCellRender date={date} />;

    return (
        <Form
            onFieldsChange={formFieldsChangeHandler}
            form={form}
            layout='vertical'
            name='formUserPersonalTrainings'
            onFinish={finishFunc}
            autoComplete='off'
            initialValues={initialFormValues}
            className={classes.form}
        >
            <div className={classes.body}>
                <Form.Item name='trainingsSelect' className={classes.training}>
                    <Select
                        data-test-id={WORKOUT_DATA_TEST_ID.modalCreateExerciseSelect}
                        placeholder='Выбор типа тренировки'
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                            (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
                        }
                        options={allowedOptions}
                    />
                </Form.Item>
                <div className={classes.wrapper__fields_two}>
                    <Form.Item name='trainingsDate' className={classes.date}>
                        <DatePicker
                            data-test-id={WORKOUT_DATA_TEST_ID.modalDrawerRightDatePicker}
                            className='trainings__drawer_date-picker'
                            dateRender={dateCellRender}
                            locale={locale}
                            format={dateFullFormatWithDot}
                            disabledDate={disabledDate}
                        />
                    </Form.Item>

                    <Form.Item
                        name='withPeriodActivate'
                        valuePropName='checked'
                        className={classes.period__activate}
                    >
                        <Checkbox
                            data-test-id={WORKOUT_DATA_TEST_ID.modalDrawerRightCheckboxPeriod}
                            className={classes.checkbox}
                            onChange={(event) => activateAdditionalSelect(event)}
                        >
                            С периодичностью
                        </Checkbox>
                    </Form.Item>
                </div>

                {allowSelectPeriod && (
                    <div className={classnames(classes.period, classes.wrapper__fields_two)}>
                        <Form.Item name='periodSelect' className={classes.select}>
                            <Select
                                data-test-id={WORKOUT_DATA_TEST_ID.modalDrawerRightSelectPeriod}
                                placeholder='Периодичность'
                                optionFilterProp='children'
                                filterOption={(input, option) =>
                                    (option?.label.toLowerCase() ?? '').includes(
                                        input.toLowerCase(),
                                    )
                                }
                                options={selectPeriodOptions}
                            />
                        </Form.Item>
                    </div>
                )}
                <FormDrawerList />
            </div>

            <Form.Item className={classes.button_block}>
                <Button
                    disabled={isSubmitDisabled}
                    size='large'
                    htmlType='submit'
                    block={true}
                    type='primary'
                    className={classes.submit}
                >
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};
