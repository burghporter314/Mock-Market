import React from 'react';
import LogoutButton from '../LogoutButton';
import renderer from 'react-test-renderer';

it('should match snapshot', () => {
    const component = renderer.create(
        <LogoutButton/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})