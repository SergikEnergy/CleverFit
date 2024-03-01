import { FC, useContext, useState } from 'react';
import { ModalFeedbackContext } from '../../reactContexts/modalFeedback-context';
import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setFeedback } from '@redux/reducers/feedbackSlice';

import { Divider, Form, Input, Rate, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classes from './NewFeedBack.module.css';
import classnames from 'classnames';

type FieldType = {
    rating: number;
    comment: string;
};
const { TextArea } = Input;

export const NewFeedback: FC = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [rateValue, setRateValue] = useState(0);
    const { closeModal } = useContext(ModalFeedbackContext);
    const { comment: commentFromState, rating: ratingFromState } = useAppSelector(
        (state) => state.feedback,
    );
    const handleCloseModal = () => {
        closeModal();
    };

    const handleChangeRate = (value: number) => {
        setRateValue(Number(value));
    };

    const handleSubmit = ({ rating, comment }: FieldType) => {
        dispatch(setFeedback({ rating, comment }));
        form.resetFields();
        setSubmitDisabled(true);
        closeModal();
    };

    const handleFormChanged = () => {
        setSubmitDisabled(false);
    };
    return (
        <div className={classes.feedback}>
            <div className={classes.header}>
                <div className={classes.wrapper}>
                    <div className={classes.title}>Ваш отзыв</div>
                    <div className={classes.close} onClick={handleCloseModal}>
                        <CloseOutlined size={10} />
                    </div>
                </div>
            </div>
            <Divider style={{ height: '2px', margin: 0 }} />
            <Form
                form={form}
                name='ratingForm'
                onFieldsChange={handleFormChanged}
                style={{ width: '100%' }}
                autoComplete='off'
                onFinish={handleSubmit}
                className={classnames(classes.form)}
            >
                <Form.Item<FieldType>
                    name='rating'
                    className={classnames(classes.rating, classes.antFixed)}
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                    ]}
                >
                    <Rate value={rateValue} onChange={handleChangeRate} />
                </Form.Item>
                <Form.Item<FieldType>
                    name='comment'
                    className={classnames(classes.comment, classes.antFixed)}
                >
                    <TextArea
                        autoSize={{ minRows: 2 }}
                        placeholder='Autosize height based on content lines'
                    />
                </Form.Item>

                <Divider style={{ margin: 0, height: '2px' }} />
                <Form.Item className={classnames(classes.button, classes.antFixed)}>
                    <Button
                        disabled={submitDisabled}
                        htmlType='submit'
                        block
                        size='large'
                        type='primary'
                    >
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
