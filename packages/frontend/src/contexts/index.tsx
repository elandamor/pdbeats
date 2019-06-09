import React, { FC } from 'react';

import AuthenticatedUserProvider from './AuthenticatedUser.context';
import OnDeckProvider from './OnDeck.context';
import PlaylistProvider from './Playlist.context';

interface IAppProviders {
  children: React.ReactNode;
}

export const AppProviders: FC<IAppProviders> = ({ children }) => (
  <AuthenticatedUserProvider>
    <OnDeckProvider>
      <PlaylistProvider>
        {children}
      </PlaylistProvider>
    </OnDeckProvider>
  </AuthenticatedUserProvider>
);
