import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const useUserSelector = () => useAppSelector((state) => state.user);
