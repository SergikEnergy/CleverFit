import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const useInvitationsSelector = () => useAppSelector((state) => state.invitationsForUser);
