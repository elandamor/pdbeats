import React, { FC } from 'react';

import AuthenticatedUserProvider from './AuthenticatedUser.context';
import OnDeckProvider from './OnDeck.context';

interface IAppProviders {
  children: React.ReactNode;
}

export const AppProviders: FC<IAppProviders> = ({ children }) => (
  <AuthenticatedUserProvider>
    <OnDeckProvider>
      {children}
    </OnDeckProvider>
  </AuthenticatedUserProvider>
);
