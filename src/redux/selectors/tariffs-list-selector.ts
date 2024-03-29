import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const useTariffsListSelector = () => useAppSelector((state) => state.tariffsList);
