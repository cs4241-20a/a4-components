import React from 'react';

class ClearButton extends React.Component {
    constructor(props) {
        super(props);
        this.handle_clear = this.handle_clear.bind(this);
    }

    /**
     * Send a /clear API HTTP request to clear the all of the current
     * user's stats.
     */
    handle_clear(){
        fetch( '/clear', {
            method:'GET',
        }).then(response => {
            if(response.status === 200){
                this.props.onDataClear();
            }
        });
    }


    render(){
        return (
            <button className="clear_button button is-primary" onClick={this.handle_clear}>Clear Stats</button>
        );
    }
}

export default ClearButton;