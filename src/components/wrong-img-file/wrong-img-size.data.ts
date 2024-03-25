import { LIMIT_IMG_SIZE } from '@utils/constants/profile-data';
import { ResultProps } from 'antd';

export const WRONG_SIZE_IMG: ResultProps & { buttonText: string; buttonKey: string } = {
    title: 'Файл слишком большой',
    subTitle: `Выберите файл размером менее ${LIMIT_IMG_SIZE} МБ.`,
    status: 'error',
    buttonText: 'Закрыть',
    buttonKey: 'wrong-file-size-modal',
};
