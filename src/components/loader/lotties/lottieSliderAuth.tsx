import { FC } from 'react';

import Lottie from 'react-lottie';
import loaderIco from './loader.json';

export const LottieAuthSlider: FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderIco,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return <Lottie options={{ ...defaultOptions }} height={150} width={150} speed={1} />;
};
