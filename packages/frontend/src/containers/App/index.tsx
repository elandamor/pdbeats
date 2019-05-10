import classNames from 'classnames';
// @ts-ignore
import React, { Component, Suspense } from 'react';
import Measure from 'react-measure';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// Components
import { ErrorBoundary, Header , LoadingBar, Navigation, Player, Routes, Sidebar} from '../../components';
// Routes
import routes from '../../routes';
// Styles
import GlobalStyles, { THEME } from '../../global-styles';
import Wrapper, { BottomSheet, Pages } from './styles';

import OnDeckProvider, { OnDeckContext } from '../../contexts/OnDeck.context';
import { Grid, Home, List, Music } from 'react-feather';
import AuthenticatedUserProvider from '../../contexts/AuthenticatedUser.context';

// import { makeDebugger } from '../../utils';
// const debug = makeDebugger('App');

/* tslint:disable:no-magic-numbers */
export const breakpoints = (width: number) => {
  if (width < 600) {
    return 'v-xsmall';
  }
  if (width >= 600 && width < 1024) {
    return 'v-small';
  }
  if (width >= 1024 && width < 1440) {
    return 'v-medium';
  }
  if (width >= 1440 && width < 1920) {
    return 'v-large';
  }
  if (width >= 1920) {
    return 'v-xlarge';
  }
  return 'v-unknown';
};
/* tslint:enable:no-magic-numbers */

export interface IProps extends RouteComponentProps<any> {}

interface IState {
  bounds: {
    height: number;
    width: number;
  };
  theme: object;
}

/**
 * @render react
 * @name App container
 * @description The skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar).
 */
class App extends Component<IProps, IState> {
  protected componentIsMounted: boolean;
  protected previousLocation: object;

  constructor(props: IProps) {
    super(props);

    this.state = {
      bounds: {
        height: 0,
        width: 0,
      },
      theme: THEME,
    };

    this.previousLocation = props.location;
  }

  public componentDidMount() {
    this.componentIsMounted = true;
  }

  public componentWillUpdate(nextProps: IProps) {
    const { location } = this.props;

    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  public componentWillUnmount() {
    this.componentIsMounted = false;
  }

  public setState(nextState: any, cb?: () => void) {
    if (this.componentIsMounted) {
      super.setState(nextState, cb);
    }
  }

  public render() {
    const { location } = this.props;
    const {
      bounds: { width },
    } = this.state;

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );

    return (
      <ThemeProvider theme={this.state.theme}>
        <Measure
          bounds
          onResize={(contentRect) => {
            this.setState({ bounds: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <AuthenticatedUserProvider>
              <OnDeckProvider>
                <OnDeckContext.Consumer>
                  {({ upNext }) => (
                    <Wrapper
                      className={classNames('c-app__container', breakpoints(width))}
                      // @ts-ignore
                      ref={measureRef}
                    >
                      <GlobalStyles />
                      <ErrorBoundary>
                        <Sidebar />
                      </ErrorBoundary>
                      <Pages className="c-pages">
                        <ErrorBoundary>
                          <Suspense fallback={<LoadingBar loading />}>
                            <Routes
                              location={isModal ? this.previousLocation : location}
                              routes={routes}
                            />
                          </Suspense>
                        </ErrorBoundary>
                      </Pages>
                      <ErrorBoundary>
                        <Player playlist={upNext} />
                      </ErrorBoundary>
                      {
                        // tslint:disable-next-line:no-magic-numbers
                        width < 1024 && (
                          <BottomSheet>
                            <ErrorBoundary>
                              <Navigation
                                links={[
                                  {
                                    exact: true,
                                    href: '/',
                                    icon: <Home />,
                                    label: 'Home'
                                  },
                                  {
                                    href: '/albums',
                                    icon: <Grid />,
                                    label: 'Albums'
                                  },
                                  {
                                    href: '/playlists',
                                    icon: <List />,
                                    label: 'Playlists'
                                  },
                                  {
                                    href: '/songs',
                                    icon: <Music />,
                                    label: 'Songs'
                                  }
                                ]}
                                hideLabels
                              />
                            </ErrorBoundary>
                          </BottomSheet>
                        )
                      }
                    </Wrapper>
                  )}
                </OnDeckContext.Consumer>
              </OnDeckProvider>
            </AuthenticatedUserProvider>
          )}
        </Measure>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
