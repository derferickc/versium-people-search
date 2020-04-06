import React, { Component } from "react"
 
class Search extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          firstName: '',
          lastName: '',
          state: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault()

        this.props.fetchResults(this.state)
    }

    render() {
        return (
            <section className="search-wrapper text-left">
                <form onSubmit={this.handleSubmit}>
                    <div className='flex-outer'>
                        <div className='flex-inner'>
                            <label className="firstName">FirstName </label>
                            <input
                                type='text'
                                name="firstName"
                                placeholder="eg. John"
                                onChange={this.handleChange}
                                disabled={this.props.loading}
                                pattern="^[A-Za-z]{1,50}"
                                required
                            />
                        </div>
                        <div className='flex-inner'>
                            <label className="lastName">LastName </label>
                            <input
                                type='text'
                                name="lastName"
                                placeholder="eg. Smith"
                                onChange={this.handleChange}
                                disabled={this.props.loading}
                                pattern="^[A-Za-z]{1,50}"
                                required
                            />
                        </div>
                        <div className='flex-inner'>
                            <label className="state">State </label>
                            <input
                                type='text'
                                name="state"
                                placeholder="eg. LA"
                                onChange={this.handleChange}
                                disabled={this.props.loading}
                                pattern="^[A-Za-z]{1,2}"
                                required
                            />
                        </div>
                        <div className='flex-inner-submit'>
                            <input
                                className="submit-btn"
                                type="submit"
                                value="Submit"
                                disabled={this.props.loading}
                            />
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}
 
export default Search;