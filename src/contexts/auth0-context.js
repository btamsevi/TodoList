import React, { Component, createContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

// create the context
export const Auth0Context = createContext();

// create a provider
export class Auth0Provider extends Component {
  state = { 
        auth0Client: null, 
        isLoading: true, 
        isAuthenticated: false,
        user: null,
    };

  config = {
    domain: 'btamsevi.auth0.com',
    client_id: 'YVM1xoqNAef9DFo5XbafGv063hKkrHsT',
    redirect_uri: 'http://localhost:3000/',
    responseType: 'token id_token',
    audience: 'https://btamsevitodo.azurewebsites.net'
};

    async componentDidMount() {
        await this.initializeAuth0().catch(console.log);
    }


    // initialize the auth0 library
    initializeAuth0 = async () => {
        const auth0Client = await createAuth0Client(this.config).catch(console.log);
        this.setState({ auth0Client });

        // check to see if they have been redirected after login
        if (window.location.search.includes('code=')) {
            return this.handleRedirectCallback();
        }

        const isAuthenticated = await auth0Client.isAuthenticated().catch(console.log);
        const user = isAuthenticated ? await auth0Client.getUser().catch(console.log) : null;


        this.setState({ isLoading: false, isAuthenticated, user });
    };

    // handle the authentication callback
    handleRedirectCallback = async () => {
        this.setState({ isLoading: true });

        await this.state.auth0Client.handleRedirectCallback();
        const user = await this.state.auth0Client.getUser();

        this.setState({ user, isAuthenticated: true, isLoading: false });
        window.history.replaceState({}, document.title, window.location.pathname);
    };

    render() {
        const { auth0Client, isLoading, isAuthenticated, user } = this.state;
        const { children } = this.props;


        const configObject = {
            auth0Client,
            isLoading,
            isAuthenticated,
            user,

            loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
            getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
            getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
            logout: (...p) => auth0Client.logout(...p)
        };

        return (
            <Auth0Context.Provider value={configObject}>
            {children}
            </Auth0Context.Provider>
        );
        }
}