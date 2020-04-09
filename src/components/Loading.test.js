import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App  from '../App'
import Loading  from './Loading'

Enzyme.configure({ adapter: new Adapter() });

describe('<Loading /> component', () => {
    it('it should render list .results-wrapper class if <App /> props.results is true', () => {
        const wrapper = mount(<App />)
        wrapper.setState({
            loading: true
        })

        const loading = wrapper.find(Loading)
        const loadingText = loading.find('.loading-wrapper').text()
        expect(loading.exists()).toBe(true)
        expect(loadingText).toContain("Loading")
    })
})