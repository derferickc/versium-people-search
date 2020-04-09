import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Results  from './Results'

Enzyme.configure({ adapter: new Adapter() });

describe('<Results /> component', () => {
    it('it should render .no-results-wrapper and .results-wrapper-error divs on mount; no error text', () => {
        const wrapper = shallow(<Results results={false}/>)
        const noResultsDiv = wrapper.find('.no-results-wrapper')
        const errorDiv = wrapper.find('.results-wrapper-error')
        const errorText = wrapper.find('.results-wrapper-error').text()

        expect(noResultsDiv.length).toBe(1)
        expect(errorDiv.length).toBe(1)
        expect(errorText.length).toBe(0)
    })

    it('it should render the .results-wrapper-error with error text when reults is false and errors is defined', () => {
        const wrapper = shallow(<Results results={false} error={'No results Found'}/>)
        const errorText = wrapper.find('.results-wrapper-error').text()
        expect(errorText).toBe("No results Found")
    })

    it('it should render list .results-wrapper class if props.results is true and people are defined', () => {
        const results = true
        const people = [
            {
                FirstName: 'Frederick',
                LastName: 'Choe',
                Address: '4465 142nd AVE SE',
                City: 'Bellevue',
                State: 'WA'
            }
        ]
        const wrapper = shallow(<Results results={results} people={people}/>)
        const indexValue = wrapper.find('strong').text()
        const firstNameValue = wrapper.find('.result-firstName').text()
        const lastNameValue = wrapper.find('.result-lastName').text()
        const addressValue = wrapper.find('.result-address').text()
        const cityValue = wrapper.find('.result-city').text()
        const stateValue = wrapper.find('.result-state').text()

        expect(indexValue).toBe("Result #1")
        expect(firstNameValue).toBe("FirstName: Frederick")
        expect(lastNameValue).toBe("LastName: Choe")
        expect(addressValue).toBe("Address: 4465 142nd AVE SE")
        expect(cityValue).toBe("City: Bellevue")
        expect(stateValue).toBe("State: WA")
    })
})
