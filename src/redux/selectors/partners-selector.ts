import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const usePartnersSelector = () => useAppSelector((state) => state.trainingPartners);
