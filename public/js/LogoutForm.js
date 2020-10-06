class LogoutForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      fetch('/logout')
      .then(response => window.location = "/")
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <button>
            Log out
            </button>
        </form>
      );
    }
  }
  
  ReactDOM.render(
    <LogoutForm />,
    document.getElementById('logout')
  );