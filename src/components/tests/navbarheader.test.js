import React from 'react';
import NavbarHeader from '../NavbarHeader';
import renderer from 'react-test-renderer';

it('should match snapshot', () => {
    const component = renderer.create(
        <NavbarHeader/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})