import { FC, useState } from 'react';
import { useUserTrainingsSelector } from '@redux/selectors';
import { dateFullFormatWithDot } from '@utils/constants/date-formats';
import { Button, Checkbox, DatePicker, Form, Select } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import classnames from 'classnames';
import { Moment } from 'moment';

import { useTrainingsDrawerContext } from '../../../../../../react-contexts';
import { FormDrawerList } from '../form-drawer-list/form-drawer-list';

import {
    initialEmptyFormFields,
    selectDayOfWeekOptions,
    selectPeriodOptions,
} from './form-drawer.data';
import { FormDrawerPropsType, FormFieldsType } from './form-drawer.types';
import { disabledDate } from './form-drawer.utils';

import classes from './form-drawer.module.css';

export const FormDrawer: FC<FormDrawerPropsType> = () => {
    const { closeDrawer, open: isDrawerOpened } = useTrainingsDrawerContext();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [allowSelectPeriod, setAllowSelectPeriod] = useState(false);
    const [allowSelectDay, setAllowSelectDay] = useState(false);
    const [form] = Form.useForm<FormFieldsType>();
    const { allowedTrainingsList } = useUserTrainingsSelector();

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
        if (value === 0) {
            setAllowSelectDay(true);
        } else {
            setAllowSelectDay(false);
        }
        console.log('selectedPeriod', value);
    };

    const activateAdditionalSelect = (event: CheckboxChangeEvent) =>
        event.target.checked ? setAllowSelectPeriod(true) : setAllowSelectPeriod(false);

    const finishFunc = (values: FormFieldsType) => {
        console.log(values);
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

    const formFieldsChangeHandler = () => setIsSubmitDisabled(false);

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
                <Form.Item name='trainingsSelect'>
                    <Select
                        defaultValue={null}
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
                            format={dateFullFormatWithDot}
                            onChange={onSelectedDateChange}
                            disabledDate={disabledDate}
                        />
                    </Form.Item>

                    <Form.Item name='withPeriodActivate' className={classes.period__activate}>
                        <Checkbox
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
                                defaultValue={1}
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

                        {allowSelectDay && (
                            <Form.Item
                                name='dayWeekSelect'
                                className={(classes.select, classes.select__day)}
                            >
                                <Select
                                    placeholder='Понедельник'
                                    optionFilterProp='children'
                                    filterOption={(input, option) =>
                                        (option?.label.toLowerCase() ?? '').includes(
                                            input.toLowerCase(),
                                        )
                                    }
                                    options={selectDayOfWeekOptions}
                                />
                            </Form.Item>
                        )}
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
