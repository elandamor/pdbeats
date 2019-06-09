import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';

import IOImageLazyLoader from '../../utils/IOImageLazyLoader';

export interface IProps {
  className?: string;
  src: string;
}

/**
 * @render react
 * @name Img component
 * @description Image component.
 * @example
 *    <Image
 *      src="./image.png"
 *    />
 */

const Image: FC<IProps> = ({ className, src, ...rest }) => {
  const el = useRef(null);

  useEffect(() => {
    if (el.current) {
      new IOImageLazyLoader(el.current);
    }
  }, [el]);

  return (
    <Wrapper className={classNames('', className)} {...rest}>
      <img {...rest} ref={el} data-src={src} />
    </Wrapper>
  )
};

export default Image;
