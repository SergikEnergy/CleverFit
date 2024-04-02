import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const useUserTrainingsSelector = () => useAppSelector((state) => state.userTrainings);
