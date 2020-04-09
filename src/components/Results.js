import React from "react"
 
export default function Results (props) {

  return (
    <section className={props.results ? 'results-wrapper': 'no-results-wrapper'}>
          {props.results
            ?
            <div className="results-wrapper">
              {props.people.map((result, index) => (
                <div className="result" key={index}>
                  <div className="result-index"><strong>Result #{index+1}</strong></div>
                  <div className="result-firstName">FirstName: {result.FirstName}</div>
                  <div className="result-lastName">LastName: {result.LastName}</div>
                  <div className="result-address">Address: {result.Address}</div>
                  <div className="result-city">City: {result.City}</div>
                  <div className="result-state">State: {result.State}</div>
                </div>
              ))}
            </div>
            :
            <div className="results-wrapper-error">{props.error}</div>
          }
    </section>
  )
}