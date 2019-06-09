import React, { FC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';
import Navigation from '../Navigation';
import Spacer from '../Spacer';
import Input from '../Input';
import { AuthenticatedUserContext } from '../../contexts/AuthenticatedUser.context';

// import { makeDebugger } from '../../utils';
// const debug = makeDebugger('Sidebar');

interface IProps {
  className?: string;
};

/**
 * @render react
 * @name Sidebar component
 * @description Sidebar component.
 * @example
 * <Sidebar />
 */

const Sidebar: FC<IProps> = ({ className }) => (
  <Wrapper className={classNames('c-sidebar', className)}>
  <AuthenticatedUserContext.Consumer>
    {({ isAdmin, toggleUserType }) => (
      <React.Fragment>
        <Spacer spacing={82} />
        <Navigation
          links={[
            { exact: true, href: '/', label: 'Discover' },
          ]}
        />
        <Spacer spacing={24} />
        <Navigation
          links={[
            { href: '/playlists', label: 'Playlists' },
            { href: '/artists', label: 'Artists' },
            { href: '/albums', label: 'Albums' },
            { href: '/songs', label: 'Songs' },
          ]}
        />
        <Spacer spacing={32} />
        <Input
          id="userType"
          label="Admin"
          name="userType"
          onChange={toggleUserType}
          type="checkbox"
          checked={isAdmin}
          toggle="true"
        />
      </React.Fragment>
    )}
  </AuthenticatedUserContext.Consumer>

  </Wrapper>
);

export default Sidebar;
