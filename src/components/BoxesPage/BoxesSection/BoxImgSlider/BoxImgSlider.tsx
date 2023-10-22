'use client';
import Image from 'next/image';
import ReusableSlider from '@components/components/ReusableSlider/ReusableSlider';

import styles from './BoxImgSlider.module.scss';

const BoxImgSlider = ({ img }: { img: string[] }) => {
  return (
    <div className={styles.img_container}>
      <ReusableSlider dotsStyles={styles.dots} dots infinite autoplay>
        {img.map((imageSrc, index) => (
          <div key={index} className={styles.img_inner_container}>
            <Image
              className={styles.image}
              src={imageSrc}
              priority
              fill
              alt="A box"
              sizes="(min-width: 1230) 515px,
                (min-width: 1024) 480px,
                100%"
            />
          </div>
        ))}
      </ReusableSlider>
    </div>
  );
};

export default BoxImgSlider;
