class DeleteListingForm extends React.Component {
    constructor(props) {
      super(props);
      this.id = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  

    handleSubmit(event) {
      event.preventDefault();
    //   console.log(this.state)
      let cameraData = {
          "delete": true,
          "id": this.id.current.value
      }
      console.log( cameraData )

      let body = JSON.stringify( cameraData )
    
      console.log(body)
      fetch('/delete', {
        method: 'POST',
        body,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(listings => {
          displayListings(listings)
    
        })
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
              Listing Number:
              <input type="number"
              ref={this.id} />
          </label>
          <input type="submit" value="Delete Listing" />
        </form>
      );
    }
  }


ReactDOM.render(
  <DeleteListingForm />,
  document.getElementById('deleteListing')
);