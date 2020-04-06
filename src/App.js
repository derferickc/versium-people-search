import React, { Component } from "react"
import Search from './components/Search'
import Results from './components/Results'
import Loading from './components/Loading'
import './index.scss';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      results: [],
      error: null,
      loading: false
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

    fetch(fetchQuery)
      .then(response => response.json())
      .then(
        (results) => {
          // Handle error
          if(results.datafinder.results === undefined) {
            this.setState({
              error: "No results Found",
              loading: false
            })
          } else {
          // Handle the result
            this.setState({
              results: results.datafinder.results,
              error: null,
              loading: false
            });
            console.log(results)
          }
        }
      )
  }

  render() {
    const { results, error, loading } = this.state

    return (
      <div className="App">
        <div className="container">
          <section className="header text-center">
            <h1>Welcome to Versium People Search</h1>
          </section>
          <Search 
            fetchResults={this.handleFetch}
            loading={loading}
          />

          {loading === true
            ? <Loading />
            : <Results 
                searchResults={results}
                error={error}
              />
          }
        </div>
      </div>
    );
  }
}

export default App;
