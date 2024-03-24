import { ResultProps } from 'antd';

const LIMIT_SIZE = 5;

export const WRONG_SIZE_IMG: ResultProps & { buttonText: string; buttonKey: string } = {
    title: 'Файл слишком большой',
    subTitle: `Выберите файл размером менее ${LIMIT_SIZE} МБ.`,
    status: 'error',
    buttonText: 'Закрыть',
    buttonKey: 'wrong-file-size-modal',
};
