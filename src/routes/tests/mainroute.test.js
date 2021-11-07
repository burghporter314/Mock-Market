import React from 'react';
import MainPage from '../Main';
import renderer from 'react-test-renderer';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock("@auth0/auth0-react");

beforeEach(() => {
    useAuth0.mockReturnValue({
        isAuthenticated: true,
        user: {
            nickname: "testuser"
        },
        logout: jest.fn(),
        loginWithRedirect: jest.fn()
    })
})

it('should match snapshot', () => {

    const component = renderer.create(
            <MainPage/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})