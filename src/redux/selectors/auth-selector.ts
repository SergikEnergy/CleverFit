import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const useAuthSelector = () => useAppSelector((state) => state.auth);
