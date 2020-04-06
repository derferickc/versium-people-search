import React from "react"
 
export default function Results (props) {

  return (
    <section className={props.searchResults.length ? 'results-wrapper': 'no-results-wrapper'}>
          {props.searchResults.length > 0
            ?
            <div className="results-wrapper">
              {props.searchResults.map((result, index) => (
                <div className="result" key={index}>
                  <div><strong>Result #{index+1}</strong></div>
                  <div>FirstName: {result.FirstName}</div>
                  <div>LastName: {result.LastName}</div>
                  <div>Address: {result.Address}</div>
                  <div>City: {result.City}</div>
                  <div>State: {result.State}</div>
                </div>
              ))}
            </div>
            :
            <div className="error">{props.error}</div>
              }
    </section>
  )
}