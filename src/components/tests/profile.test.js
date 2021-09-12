import React from 'react';
import Profile from '../Profile';
import renderer from 'react-test-renderer';

it('should match snapshot', () => {
    const component = renderer.create(
        <Profile/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})