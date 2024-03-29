import { FC, useContext, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { AddFeedbackError, AddFeedbackSuccess } from '@components/add-feedback-results';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { useAddNewFeedbackMutation } from '@redux/api/feedbacks-api';
import { resetFeedback, setFeedback } from '@redux/reducers/feedback-slice';
import { Button, Divider, Form, Input, Rate } from 'antd';
import classnames from 'classnames';

import { DATA_TEST_ID } from '../../data/data-test-ids';
import { getStarRateIcon } from '../../helpers/get-star-rate-icon';
import { LoaderStateContext, ModalReportContext } from '../../react-contexts';

import classes from './new-feedback.module.css';

type FieldType = {
    rating: number;
    comment: string;
};
const { TextArea } = Input;

export const NewFeedback: FC = () => {
    const { comment: commentFromState, rating: ratingFromState } = useAppSelector(
        (state) => state.feedback,
    );
    const [postComment, { isLoading: isQueryLoading }] = useAddNewFeedbackMutation();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [submitDisabled, setSubmitDisabled] = useState(!ratingFromState);
    const [rateValue, setRateValue] = useState(ratingFromState ?? 0);
    const [textValue, setTextValue] = useState(commentFromState || '');
    const { closeModal, setNode, setWidthModal, openModal } = useContext(ModalReportContext);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);

    useEffect(() => {
        if (isQueryLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isQueryLoading, startLoader, stopLoader]);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const postNewFeedback = async (message: string, rating: number) => {
        try {
            await postComment({ message, rating }).unwrap();
            closeModal();
            setWidthModal('clamp(328px, 100%, 539px)');
            setNode(<AddFeedbackSuccess />);
            openModal();
            dispatch(resetFeedback());
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                closeModal();
                stopLoader();
                setWidthModal('clamp(328px, 100%, 539px)');
                setNode(<AddFeedbackError />);
                openModal();
            }
        }
    };

    const handleCloseModal = () => {
        closeModal();
    };

    const handleChangeRate = (value: number) => {
        setRateValue(value);
        setActiveIndex(value - 1);
    };

    const handleChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(event.target.value);
    };

    const handleSubmit = ({ rating, comment }: FieldType) => {
        dispatch(setFeedback({ rating, comment }));
        setSubmitDisabled(true);
        postNewFeedback(comment, rating);
    };

    const handleFormChanged = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);

        setSubmitDisabled(hasErrors);
    };

    return (
        <div className={classes.feedback}>
            <div className={classes.header}>
                <div className={classes.wrapper}>
                    <div className={classes.title}>Ваш отзыв</div>
                    <button
                        type='button'
                        aria-label='close-modal'
                        className={classes.close}
                        onClick={handleCloseModal}
                    >
                        <CloseOutlined size={10} />
                    </button>
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
                >
                    <Rate
                        className={classes.rateStars}
                        value={rateValue}
                        onChange={handleChangeRate}
                        character={({ index }) => getStarRateIcon({ value: index }, activeIndex)}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    name='comment'
                    className={classnames(classes.comment, classes.antFixed)}
                >
                    <TextArea
                        value={textValue}
                        onChange={handleChangeComment}
                        autoSize={{ minRows: 2 }}
                        placeholder='Autosize height based on content lines'
                    />
                </Form.Item>

                <Divider style={{ margin: 0, height: '2px' }} />
                <Form.Item className={classnames(classes.button, classes.antFixed)}>
                    <Button
                        data-test-id={DATA_TEST_ID.newReviewSubmitBtn}
                        disabled={submitDisabled}
                        htmlType='submit'
                        block={true}
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
