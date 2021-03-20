import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

configure({ adapter: new Adapter() })

describe('Burger Builder Container', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
        <BurgerBuilder 
            onGetIngredients={()=>{}}
            onGetIngredientPrices={()=>{}}
             />)
    })

    it('should render a build control for each ingredients & price that exist', () => {
        wrapper.setProps({
            ingredients: {
                salad: 0
            },
            ingredientPrices: {
                salad: 1
            }
        })
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})