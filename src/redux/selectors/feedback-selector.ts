import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const useFeedbackSelector = () => useAppSelector((state) => state.feedback);
