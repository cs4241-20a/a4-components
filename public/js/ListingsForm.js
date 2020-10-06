class ListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.listings = []
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('listings', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(listings => {
        this.listings = listings
        this.forceUpdate()
        this.renderData()
      })
  }

  renderData() {
    return this.listings.map((listing, index) => {
      const { cameramake, cameramodel, cameraformat, price, condition, id } = listing
      return (
        <tr key={id}>
          <td>{cameramake}</td>
          <td>{cameramodel}</td>
          <td>{cameraformat}</td>
          <td>{price}</td>
          <td>{condition}</td>
          <td>{id}</td>
        </tr>
      )
    })

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button>
          Listings
</button>
        <div>
          <table>
            <tbody>
              {this.renderData()}
            </tbody>
          </table>
        </div>
      </form>
    );
  }
}


ReactDOM.render(
  <ListingForm />,
  document.getElementById('currentListings')
);