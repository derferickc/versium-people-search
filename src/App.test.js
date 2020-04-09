import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetchMock from 'fetch-mock'
import App  from './App'
import Header  from './components/Header'
import Search  from './components/Search'
import Results  from './components/Results'
import Loading  from './components/Loading'

Enzyme.configure({ adapter: new Adapter() });

afterEach(fetchMock.restore)

const nextTick = async () => {
    return new Promise(resolve => {
        setTimeout(resolve, 0)
    })
}

describe('<App /> component', () => {
    it('on mount it renders <Header />, <Search />, <Results /> components; <Loading /> is not rendered', () => {
        const wrapper = shallow(<App />)
        const header = wrapper.find(Header)
        expect(header.exists()).toBe(true)
        
        const search = wrapper.find(Search)
        expect(search.exists()).toBe(true)

        const results = wrapper.find(Results)
        expect(results.exists()).toBe(true)

        const loading = wrapper.find(Loading)
        expect(loading.exists()).toBe(false)
    })

    it('loads the <Results /> component if loading is false and displays data once fetched', async () => {
        const wrapper = mount(<App />)

        const firstName = "frederick"
        const lastName = "choe"
        const state = "WA"
        const url = `https://datafinder.com/qdf.php?service=phone&k2=9abbxna7d2b65ivia3p9vljs&cfg_maxrecs=100&d_first=${firstName}&d_last=${lastName}&d_state=${state}`

        const people = [
            {
                FirstName: 'Frederick',
                LastName: 'Choe',
                Address: '4465 142nd AVE SE',
                City: 'Bellevue',
                State: 'WA'
            }
        ]

        // mock fetch call to API
        fetchMock.getOnce(url, {
            status: 200,
            body: people
        })

        // wait until fetchMock has been resolved
        await nextTick()
        wrapper.setState({
            people,
            loading: false
        })
        wrapper.update()

        const results = shallow(<Results results={true} people={people}/>)
        const firstNameValue = results.find('.result-firstName').text()
        expect(firstNameValue).toBe("FirstName: Frederick")
    })

    it('loads the <Loading /> component if <App /> state.loading is true', () => {
        const wrapper = shallow(<App />)
        wrapper.setState({
            loading: true
        })
        
        const loading = wrapper.find(Loading)
        expect(loading.exists()).toBe(true)
    })
})