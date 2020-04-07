import React, { createContext, Component } from 'react';
import LoginOrLogoutButton from './LoginOrLogoutButton';
import {cleanup, fireEvent, render} from '@testing-library/react';
import { Auth0Context as MockContext } from '../contexts/auth0-context';

afterEach(cleanup);

function setup(loggedInUser = null) {
    const user = loggedInUser;
    const mockLogout = jest.fn();

    const configObject = {
        user, 
        loginWithRedirect: (...p) => mockLoginWithRedirect(...p), 
        logout: (...p) => mockLogout(...p)
    }
    return { configObject, mockLogout }
}

test('LoginOrLogoutButton, when user is null, returns a login button', () => {
    //arange
    const { configObject } = setup();
    //act
    const { getByText } = render(
        <MockContext.Provider value={configObject}>>
            <LoginOrLogoutButton />
        </MockContext.Provider>
        );

        const loginText = getByText(/Login/);

    //assert
    expect(loginText).toBeTruthy();
});

test('LoginOrLogoutButton, when user is populated, returns a logout button', () => {
    //arange
    const { configObject } = setup('user');
    //act
    const { getByText } = render(
        <MockContext.Provider value={configObject}>>
            <LoginOrLogoutButton />
        </MockContext.Provider>
        );

        const logoutText = getByText(/Logout/);

    //assert
    expect(logoutText).toBeTruthy();
});


test('login button, when clicked, calls loginWithRedirect', () => {
    //arange
    const { configObject } = setup();
    const mockLoginFn = jest.fn();

    const { getByText } = render(
        <MockContext.Provider value={configObject}>>
            <LoginOrLogoutButton loginFn={mockLoginFn} />
        </MockContext.Provider>
        );


    //act
    fireEvent.click(getByText(/Login/));

    //assert
    expect(mockLoginFn).toHaveBeenCalledTimes(1);
});


test('logout button, when clicked, calls logout', () => {
    //arange
    const { configObject, mockLogout } = setup('user');

    const { getByText } = render(
        <MockContext.Provider value={configObject}>>
            <LoginOrLogoutButton />
        </MockContext.Provider>
        );


    //act
    fireEvent.click(getByText(/Logout/));

    //assert
    expect(mockLogout).toHaveBeenCalledTimes(1);
});
