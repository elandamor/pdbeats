/**
 * Home
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
// Styles
import Wrapper from './styles';
import { Inner, Flex, Card, Spacer } from '../../components';

// import { debug } from '../../utils';

class Home extends Component<{}, {}> {
  public render() {
    return (
      <Wrapper>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Inner>
          <Flex>
            <Flex marginRight={20}>
              <Card image="../images" compact />
            </Flex>
            <Flex direction="column">
              <Flex>
                <Card image="../images" compact />
              </Flex>
              <Spacer spacing={20} />
              <Flex>
                <Card image="../images" compact />
              </Flex>
            </Flex>
          </Flex>
          <Spacer spacing={80} />
        </Inner>
      </Wrapper>
    );
  }
}

export default Home;
