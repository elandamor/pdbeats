import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export type TUser = {
  id: string;
  type: string;
};

const DEFAULT_STATE = {
  authenticatedUser: {
    id: '0',
    type: 'client',
  },
  authenticating: true,
  isAdmin: false,
  // tslint:disable-next-line:no-empty
  setAuthenticatedUser: (authenticatedUser: TUser) => {},
  // tslint:disable-next-line:no-empty
  resetAuthenticatedUser: () => {},
  // tslint:disable-next-line:no-empty
  toggleUserType: () => {},
};

export const AuthenticatedUserContext = React.createContext(DEFAULT_STATE);

interface IProps extends RouteComponentProps {
  children: any;
}

class Provider extends React.Component<IProps, {}> {
  state = DEFAULT_STATE;

  public componentDidMount() {
    this.setAuthenticatedUser({
      id: '0',
      type: 'admin',
    });
  }

  public setAuthenticatedUser = (authenticatedUser: TUser) => {
    this.setState({
      authenticatedUser,
      authenticating: false,
      isAdmin: authenticatedUser.type === 'admin',
    });
  };

  public resetAuthenticatedUser = () => {
    this.setState({
      authenticatedUser: DEFAULT_STATE.authenticatedUser,
      isAdmin: DEFAULT_STATE.isAdmin,
    });
  };

  public toggleUserType = () => {
    switch (this.state.authenticatedUser.type) {
      case 'admin':
        this.changeToClient();
        break;
      case 'client':
        this.changeToAdmin();
        break;
      default:
        break;
    }
  }

  public render() {
    return (
      <AuthenticatedUserContext.Provider
        value={{
          ...this.state,
          resetAuthenticatedUser: this.resetAuthenticatedUser,
          setAuthenticatedUser: this.setAuthenticatedUser,
          toggleUserType: this.toggleUserType
        }}
      >
        {this.props.children}
      </AuthenticatedUserContext.Provider>
    );
  }

  private changeToAdmin = () => {
    this.setAuthenticatedUser({
      id: '0',
      type: 'admin',
    });
  }

  private changeToClient = () => {
    this.setAuthenticatedUser({
      id: '0',
      type: 'client',
    });
  }
}

export default withRouter(Provider);
