import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
// Components
import { ErrorBoundary, LoadingBar, Player, Routes, Header} from '../../components';
// Routes
import routes from '../../routes';
// Styles
import GlobalStyles from '../../global-styles';
import Wrapper, { Pages, SideNav } from './styles';

import baseTheme from '../../theme';
import { AppProviders } from '../../contexts';

/**
 * @render react
 * @name App container
 * @description The skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar).
 */
const App = () => {
  const theme = baseTheme;

  return (
    <ThemeProvider theme={theme}>
      <AppProviders>
        <Wrapper>
          <Normalize />
          <GlobalStyles />
          <ErrorBoundary>
            <SideNav />
          </ErrorBoundary>
          <Pages>
            <Header />
            <ErrorBoundary>
              <Suspense fallback={<LoadingBar />}>
                <Routes routes={routes} />
              </Suspense>
            </ErrorBoundary>
          </Pages>
          <ErrorBoundary>
            <Player />
          </ErrorBoundary>
        </Wrapper>
      </AppProviders>
    </ThemeProvider>
  );
}

export default App;
