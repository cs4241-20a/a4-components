class NewListingForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cameramake: "",
        cameramodel: "",
        cameraformat: "",
        price: 0,
        condition: "",
        delete: false,
        id: null
      }
        
      this.cameramake = React.createRef();
      this.cameramodel = React.createRef();
      this.cameraformat = React.createRef();
      this.price = React.createRef();
      this.condition = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  

    handleSubmit(event) {
      event.preventDefault();
      console.log(this.state)
      let cameraData = this.state.cameraData
      console.log( cameraData )

      let body = JSON.stringify( user )
    
      console.log(body)
      fetch('/submit', {
        method: 'POST',
        body,// this variable has the same name as the property, so the : is omitted - same as writing body: body
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
            ref={this.make} />
          </label>
          <label>
            Model:
            <input 
            defaultValue="Camera Model"
            ref={this.model} />
          </label>
          <label>
            Format:
            <input 
            defaultValue="Camera Format"
            ref={this.format} />
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
          <input type="submit" value="Add Listing" />
        </form>
      );
    }
  }


ReactDOM.render(
  <NewListingForm />,
  document.getElementById('addListing')
);