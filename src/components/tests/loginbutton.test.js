import React from 'react';
import LoginButton from '../LoginButton';
import renderer from 'react-test-renderer';

it('should match snapshot', () => {
    const component = renderer.create(
        <LoginButton/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})