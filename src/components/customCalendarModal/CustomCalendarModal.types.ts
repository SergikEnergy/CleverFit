import { IAllowedTrainResponse } from '@redux/API/api-types';

type TrainsNameImplementedType = { name: string; isImplemented: boolean };

export type CheckAllowedOrExistingTrainsType = (
    existingTrains: TrainsNameImplementedType[],
    allowedTrains: IAllowedTrainResponse[],
) => IAllowedTrainResponse[];
