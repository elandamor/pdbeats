import React, { FC, Suspense } from "react";
import classNames from "classnames";
// Components
import Image from "../Image/Loadable";
import LoadingBar from "../LoadingBar";
// Styles
import Wrapper, { Content, Description, Title } from "./styles";
import Icon from "../Icon/Loadable";

export interface IProps {
  className?: string;
  compact?: boolean;
  contentPadding?: number;
  description?: string | JSX.Element;
  image?: string;
  title?: string;
  icon?: string;
  onClick?: () => void;
}

/**
 * @render react
 * @name Card component
 * @description Card component.
 * @example
 *    <Card
 *      title="Title"
 *      description="This is a test description"
 *    />
 */

const Card: FC<IProps> = ({
  children,
  className,
  contentPadding = 20,
  description,
  image,
  title,
  icon,
  onClick,
  ...rest
}) => (
  <Wrapper
    className={classNames("c-card", className)}
    onClick={onClick}
    {...rest}
  >
    <Suspense fallback={<LoadingBar loading />}>
      {image && <Image as="div" src={image} />}
    </Suspense>
    <Content className="c-content" contentPadding={contentPadding}>
      {title && (
        <Title className="a-title">
          {icon && <Icon icon={icon} />}
          {title}
        </Title>
      )}
      {description && (
        <Description className="a-description">{description}</Description>
      )}
      {children}
    </Content>
  </Wrapper>
);

export default Card;
