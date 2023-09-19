import { forwardRef } from 'react';
import Slider, { Settings } from 'react-slick';

import styles from './ReusableSlider.module.scss';

interface ReusableSliderProps {
  slidesToShow?: number;
  children?: React.ReactNode;
  infinite?: boolean;
  dots?: boolean;
  arrows?: boolean;
  slidesToScroll?: number;
  draggable?: boolean;
  swipe?: boolean;
  dotsStyles?: string;
  speed?: number;
  beforeChange?: (prev: any, next: any) => void;
}

type ForwardedRefType = Slider | null;

const ReusableSlider = forwardRef<ForwardedRefType, ReusableSliderProps>(
  (
    {
      children,
      slidesToShow = 1,
      infinite = false,
      dots = true,
      arrows = false,
      slidesToScroll = 1,
      draggable = true,
      swipe = true,
      dotsStyles,
      speed = 700,
      beforeChange,
    },
    ref
  ) => {
    const sliderSettings: Settings = {
      slidesToShow,
      slidesToScroll,
      infinite,
      dots,
      arrows,
      draggable,
      swipe,
      appendDots: (dots: React.ReactNode) => <ul>{dots}</ul>,
      dotsClass: `${styles.dots} ${dotsStyles || ''}`,
      customPaging: () => <button></button>,
    };
    return (
      <Slider
        {...sliderSettings}
        speed={speed}
        ref={ref}
        beforeChange={beforeChange}
      >
        {children}
      </Slider>
    );
  }
);

ReusableSlider.displayName = 'ReusableSlider';

export default ReusableSlider;