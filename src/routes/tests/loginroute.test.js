import React from 'react';
import LoginPage from '../Login';
import renderer from 'react-test-renderer';

it('should match snapshot', () => {
    const component = renderer.create(
        <LoginPage/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})