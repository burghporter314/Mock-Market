import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import { useAuth0 } from '@auth0/auth0-react';
import InfoPage from '../Info';

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

    let props = {
        location: {
            search: "?ticker=ticker",
        }
    }

    const component = renderer.create(
            <InfoPage
            {...props}
            />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})