import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Search  from './Search'

Enzyme.configure({ adapter: new Adapter() });

const simulateChangeOnInput = (wrapper, inputSelector, name, newValue) => {
    const input = wrapper.find(inputSelector)
    input.simulate('change', {
        target: {
            name,
            value: newValue }
    })
    return wrapper.find(inputSelector)
}

describe('<Search /> component', () => {
    it('to check if input placeholders are correct', () => {
        const wrapper = shallow(<Search />)
        
        expect(wrapper.find('.firstName-input').props().placeholder).toBe('eg. John')
        expect(wrapper.find('.lastName-input').props().placeholder).toBe('eg. Smith')
        expect(wrapper.find('.state-input').props().placeholder).toBe('eg. LA')
    })

    it('allows you to fill out form with values', () => {
        const wrapper = shallow(<Search />)
        const firstNameInput = simulateChangeOnInput(wrapper, '.firstName-input', 'firstName', 'Fred')
        const lastNameInput = simulateChangeOnInput(wrapper, '.lastName-input', 'lastName', 'Choe')
        const stateInput = simulateChangeOnInput(wrapper, '.state-input', 'state', 'WA')

        expect(firstNameInput.props().value).toEqual('Fred')
        expect(lastNameInput.props().value).toEqual('Choe')
        expect(stateInput.props().value).toEqual('WA')
    })

    it('to check if form inputs are valid', () => {
        const wrapper = shallow(<Search />)
        const nameMatchRegex = /[A-Za-z -]{1,50}/
        const stateMatchRegex = /[A-Za-z]{1,2}/

        const firstNameInput = simulateChangeOnInput(wrapper, '.firstName-input', 'firstName', 'Fred')
        const lastNameInput = simulateChangeOnInput(wrapper, '.lastName-input', 'lastName', 'Choe')
        const stateInput = simulateChangeOnInput(wrapper, '.state-input', 'state', 'WA')

        expect(firstNameInput.props().value).toMatch(nameMatchRegex);
        expect(lastNameInput.props().value).toMatch(nameMatchRegex);
        expect(stateInput.props().value).toMatch(stateMatchRegex);
        expect(stateInput.props().value.length).toEqual(2)
    })
    
    it('submitting form calls props.fetchResults function 1 time', () => {
        const submit = jest.fn();
        const wrapper = shallow(<Search fetchResults={submit} />)

        wrapper.find('form').simulate('submit', { preventDefault() {} })
        expect(submit.mock.calls.length).toBe(1);
    })
})