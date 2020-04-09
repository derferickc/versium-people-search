import React, { Component } from "react"
import Header from './components/Header'
import Search from './components/Search'
import Results from './components/Results'
import Loading from './components/Loading'
import './index.scss'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      people: [],
      error: null,
      loading: false,
      results: false,
    }
  }

  handleFetch = (userInput) => {
    const firstName = userInput.firstName
    const lastName = userInput.lastName
    const state = userInput.state

    const fetchQuery = `https://datafinder.com/qdf.php?service=phone&k2=9abbxna7d2b65ivia3p9vljs&cfg_maxrecs=100&d_first=${firstName}&d_last=${lastName}&d_state=${state}`

    this.setState({
      loading: true,
    })

    this.fetchUsers(fetchQuery)
  }

  fetchUsers = (fetchQuery) => {
    fetch(fetchQuery)
      .then(response => response.json())
      .then(
        (results) => {
          // Handle error
          if(results.datafinder.results === undefined) {
            this.setState({
              people: [],
              error: "No results Found",
              loading: false,
              results: false
            })
          } else {
          // Handle the result
            this.setState({
              people: results.datafinder.results,
              error: null,
              loading: false,
              results: true
            });
          }
        }
      )
  }

  render() {
    const { people, error, loading, results } = this.state

    return (
      <div className="App">
        <div className="container">
          <Header />
          <Search 
            fetchResults={this.handleFetch}
            loading={loading}
          />

          {loading === true
            ? <Loading />
            : <Results 
                people={people}
                results={results}
                error={error}
              />
          }
        </div>
      </div>
    );
  }
}

export default App;
