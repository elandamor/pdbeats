import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';
import { GoBackButton, Inner } from '../../components';
import { H3 } from '../../typography';

/**
 * @render react
 * @name NotFound page
 * @description NotFound page.
 * @example
 * <NotFound />
 */

interface IProps {
  className?: string;
}

interface IState {
  [key: string]: any;
}

class NotFound extends Component<IProps, IState> {
  state:IState = {}

  public render() {
    const { className } = this.props;

    return (
      <Wrapper className={classNames('', className)}>
        <Helmet>
          <title>NotFound</title>
          <meta name="description" content="Description of NotFound" />
        </Helmet>
        <Inner>
          <GoBackButton />
          <H3 mb={0}>Oops!</H3>
          <p>The page you're looking for doesn't exist.</p>
        </Inner>
      </Wrapper>
    );
  }
}

export default NotFound;