import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import { useAuth0 } from '@auth0/auth0-react';
import TransferPage from '../Transfer';

jest.mock("@auth0/auth0-react");

beforeEach(() => {
    useAuth0.mockReturnValue({
        isAuthenticated: true,
        user: "testuser",
        logout: jest.fn(),
        loginWithRedirect: jest.fn()
    })
})

it('should match snapshot', () => {

    const component = renderer.create(
            <TransferPage/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})