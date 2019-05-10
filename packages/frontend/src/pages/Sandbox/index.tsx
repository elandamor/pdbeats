/**
 * Sandbox
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
// Styles
import Wrapper from './styles';

class Sandbox extends Component<{}, {}> {
  public render() {
    return (
      <Wrapper>
        <Helmet>
          <title>Sandbox</title>
        </Helmet>
        <div>
          <input type="checkbox" className="read-more-state" id="post-1" />

          <p className="read-more-wrap">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
            fuga facilis vel consectetur quos sapiente deleniti eveniet dolores
            tempore eos deserunt officia quis ab? Excepturi vero tempore minus
            beatae voluptatem!
            <div className="read-more-target">
              <input type="checkbox" className="read-more-state" id="post-2" />

              <p className="read-more-wrap">
                Libero fuga facilis vel consectetur quos sapiente deleniti eveniet
                dolores tempore eos deserunt officia quis ab? Excepturi vero
                tempore minus beatae voluptatem!
                <div className="read-more-target">
                  <input type="checkbox" className="read-more-state" id="post-3" />

                  <p className="read-more-wrap">
                    <span className="read-more-target">
                      Libero fuga facilis vel consectetur quos sapiente deleniti eveniet
                      dolores tempore eos deserunt officia quis ab? Excepturi vero
                      tempore minus beatae voluptatem!
                    </span>
                  </p>

                  <label htmlFor="post-3" className="read-more-trigger" />
                </div>
              </p>

              <label htmlFor="post-2" className="read-more-trigger" />
            </div>
          </p>

          <label htmlFor="post-1" className="read-more-trigger" />
        </div>
      </Wrapper>
    );
  }
}

export default Sandbox;
