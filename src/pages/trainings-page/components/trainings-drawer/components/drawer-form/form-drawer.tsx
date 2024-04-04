import { FC, useState } from 'react';
import { useUpdateTrainings } from '@hooks/use-update-trainings';
import { useUserTrainingsSelector } from '@redux/selectors';
import { dateFullFormatWithDot } from '@utils/constants/date-formats';
import { Button, Checkbox, DatePicker, Form, Select } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import locale from 'antd/es/date-picker/locale/ru_RU';
import classnames from 'classnames';
import moment, { Moment } from 'moment';

import { WORKOUT_DATA_TEST_ID } from '../../../../../../data/data-test-ids';
import { useTrainingsDrawerContext } from '../../../../../../react-contexts';
import { FormDrawerList } from '../form-drawer-list/form-drawer-list';

import { initialEmptyFormFields, selectPeriodOptions } from './form-drawer.data';
import { FormDrawerPropsType, FormFieldsType, FormFieldType } from './form-drawer.types';
import { disabledDate, prepareDataRequest } from './form-drawer.utils';
import { DataCellRender } from './form-drawer-cell-render';

import classes from './form-drawer.module.css';

import 'moment/dist/locale/ru';

moment.locale('ru');

export const FormDrawer: FC<FormDrawerPropsType> = () => {
    const { closeDrawer, open: isDrawerOpened } = useTrainingsDrawerContext();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [allowSelectPeriod, setAllowSelectPeriod] = useState(false);
    const [form] = Form.useForm<FormFieldsType>();
    const { allowedTrainingsList } = useUserTrainingsSelector();
    const updateTrainingsRequest = useUpdateTrainings();

    const allowedOptions: Array<{ value: string; label: string }> = allowedTrainingsList.map(
        (elem) => ({
            value: elem.name,
            label: elem.name,
        }),
    );

    if (!isDrawerOpened) {
        // form.resetFields();
    }

    const selectPeriodChangeHandler = (value: number) => {
        console.log(value);
    };

    const activateAdditionalSelect = (event: CheckboxChangeEvent) =>
        event.target.checked ? setAllowSelectPeriod(true) : setAllowSelectPeriod(false);

    const finishFunc = async (values: FormFieldsType) => {
        const requestBody = prepareDataRequest(values);

        if (requestBody) updateTrainingsRequest(requestBody);

        closeDrawer();
    };

    const onSelectChange = (value: string) => {
        console.log(value, 'select value');
    };

    const onSelectedDateChange = (value: Moment | null) => {
        if (value) {
            console.log(value, 'selectedDate');
        }
    };

    const formFieldsChangeHandler = () => {
        const hasSelectTrainValue = !!form.getFieldValue('trainingsSelect');
        const isDateSelected = !!form.getFieldValue('trainingsDate');
        const hasExercises =
            form
                .getFieldValue('exercises')
                .filter((elem: FormFieldType | undefined) => elem && elem.exercise.length > 0)
                .length > 0;
        setIsSubmitDisabled(!(hasSelectTrainValue && isDateSelected && hasExercises));
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
            initialValues={initialEmptyFormFields}
            className={classes.form}
        >
            <div className={classes.body}>
                <Form.Item name='trainingsSelect' initialValue={null} className={classes.training}>
                    <Select
                        data-test-id={WORKOUT_DATA_TEST_ID.modalCreateExerciseSelect}
                        placeholder='Выбор типа тренировки'
                        optionFilterProp='children'
                        onChange={onSelectChange}
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
                            onChange={onSelectedDateChange}
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
                                onChange={selectPeriodChangeHandler}
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
