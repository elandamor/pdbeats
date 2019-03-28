import React, { FC } from "react";
import classNames from "classnames";
// Styles
import Wrapper from "./styles";

export interface IProps {
  as?: string;
  className?: string;
  src: string;
}

/**
 * @render react
 * @name Image component
 * @description Image component.
 * @example
 *    <Image
 *      src="./image.png"
 *    />
 */

const Image: FC<IProps> = ({ as: T, className, src, ...rest }) =>
  T ? (
    // @ts-ignore
    <T
      className={classNames("a-image", className)}
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPositionX: "center"
      }}
      {...rest}
    />
  ) : (
    <Wrapper className={classNames("a-image", className)} src={src} {...rest} />
  );

export default Image;
