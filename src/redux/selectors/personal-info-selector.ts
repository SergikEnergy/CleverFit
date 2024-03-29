import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const usePersonalInfoSelector = () => useAppSelector((state) => state.personalInfo);
