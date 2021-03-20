import React from 'react';
import NavigationItems from './NavigationItems'
import NavigationItem from '../NavigationItem/NavigationItem'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Navigation Items', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render /, orders and logout when authed', () => {
        wrapper.setProps({ isAuthed: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
        expect(wrapper.contains(<NavigationItem link='/'>Burger Builder</NavigationItem>)).toEqual(true)
        expect(wrapper.contains(<NavigationItem link='/orders'>Orders</NavigationItem>)).toEqual(true)
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
    })

    it('should only render / and signin when not authed', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
        expect(wrapper.contains(<NavigationItem link='/'>Burger Builder</NavigationItem>)).toEqual(true)
        expect(wrapper.contains(<NavigationItem link='/auth'>Signin</NavigationItem>)).toEqual(true)
    })
});