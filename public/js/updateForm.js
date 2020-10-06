class UpdateListingForm extends React.Component {
    constructor(props) {
      super(props);
      this.cameramake = React.createRef();
      this.cameramodel = React.createRef();
      this.cameraformat = React.createRef();
      this.price = React.createRef();
      this.condition = React.createRef();
      this.id = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  

    handleSubmit(event) {
      event.preventDefault();
    //   console.log(this.state)
      let cameraData = {
          "cameramake": this.cameramake.current.value,
          "cameramodel": this.cameramodel.current.value,
          "cameraformat": this.cameraformat.current.value,
          "price": this.price.current.value,
          "condition": this.condition.current.value,
          "delete": false,
          "id": this.id.current.value
      }
      console.log( cameraData )

      let body = JSON.stringify( cameraData )
    
      console.log(body)
      fetch('/update', {
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
            Make:
            <input 
            defaultValue="Camera Make"
            ref={this.cameramake} />
          </label>
          <label>
            Model:
            <input 
            defaultValue="Camera Model"
            ref={this.cameramodel} />
          </label>
          <label>
            Format:
            <input 
            defaultValue="Camera Format"
            ref={this.cameraformat} />
          </label>
          <label>
              Price:
              <input type="number"
              defaultValue="1"
              ref={this.price} />
          </label>
          <label>
              Camera Condition:
              <select ref={this.condition}>
                  <option value="great">Great</option>
                  <option value="good">Good</option>
                  <option value="decent">Decent</option>
                  <option value="poor">Poor</option>
              </select>
          </label>
          <label>
              Id:
              <input type="number"
              ref={this.id} />
          </label>
          <input type="submit" value="Update Listing" />
        </form>
      );
    }
  }


ReactDOM.render(
  <UpdateListingForm />,
  document.getElementById('updateListing')
);