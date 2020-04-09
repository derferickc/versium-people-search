import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header  from './Header'

Enzyme.configure({ adapter: new Adapter() });

describe('<Header /> component', () => {
    it('it should render the h1 with header copy', () => {
        const wrapper = shallow(<Header />)
        const h1 = wrapper.find('h1').text()
        expect(h1).toContain("Welcome to Versium People Search")
    })
})