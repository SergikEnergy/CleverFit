import { PartnersResponseType } from '@redux/api/api-types';

export const sortPartnersByNameAndStatus = (users: PartnersResponseType[]) => {
    const approvedUsers = users.filter((item) => item.status && item.status === 'accepted');
    const rejectedUsers = users.filter((item) => item.status && item.status === 'rejected');
    const otherUsers = users.filter((item) => !item.status || item.status === 'pending');

    approvedUsers.sort((a, b) => a.name.localeCompare(b.name));
    rejectedUsers.sort((a, b) => a.name.localeCompare(b.name));
    otherUsers.sort((a, b) => a.name.localeCompare(b.name));

    return approvedUsers.concat(otherUsers).concat(rejectedUsers);
};
