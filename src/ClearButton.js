import React from 'react';

class ClearButton extends React.Component {
  render(){
    return (
        <button className="clear_button button is-primary" onClick={handle_clear}>Clear Stats</button>
    );
  }
}

/**
 * Send a /clear API HTTP request to clear the all of the current
 * user's stats.
 */
function handle_clear(){
    fetch( '/clear', {
        method:'GET',
    }).then(function( response ) {
        if(response.status === 200){
            console.log("clear suceeded");
            //updateResults(response);
        }
    });
}

export default ClearButton;