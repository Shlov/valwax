'use client';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@components/components/Button/Button';
import ReusableSlider from '@components/components/ReusableSlider/ReusableSlider';
import Typography from '@components/components/Typography/Typography';

import { BoxI } from '../boxesData';

import styles from './BoxesCard.module.scss';

const BoxesCard: React.FC<BoxI> = ({ id, img, title, price, link, text }) => {
  return (
    <li className={styles.card}>
      <div className={styles.img_container}>
        <ReusableSlider dotsStyles={styles.dots} dots>
          {img.map((imageSrc, index) => (
            <div key={index} className={styles.img_inner_container}>
              <Image
                className={styles.image}
                src={imageSrc}
                priority
                fill
                alt={title}
                sizes="(min-width: 1230) 515px,
                    (min-width: 1024) 480px,
                    100%"
              />
            </div>
          ))}
        </ReusableSlider>
      </div>
      <div className={styles.card_body}>
        <div className={styles.content}>
          <Link href={`${link}/${id}`}>
            <Typography variant="subheadingBold" className={styles.title}>
              {title}
            </Typography>
          </Link>
          <Typography variant="bodyRegular" className={styles.text}>
            {text}
          </Typography>
        </div>
        <div className={styles.price_container}>
          <Typography variant="bodyRegular" className={styles.price}>
            {price}
          </Typography>
          <span>&#8372;</span>
        </div>
        <div className={styles.button_container}>
          <Button variant="primary">купити</Button>
          <Link href="/boxes">Переглянути</Link>
        </div>
      </div>
    </li>
  );
};

export default BoxesCard;
