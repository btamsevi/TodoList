import React from 'react';
import { Auth0Context } from '../contexts/auth0-context';

class LoginOrLogoutButton extends React.Component {
    render() {
        const { user, logout } = this.context;


    return(
    <div>
        {!user 

        ? (<button onClick={this.props.loginFn}>
            Login
            </button>) 

        : <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
            </button>}
    </div>
    );
    }
}

LoginOrLogoutButton.contextType = Auth0Context;
export default LoginOrLogoutButton;