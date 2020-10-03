"use strict";

class App extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            title: '',
            description: '',
            error: '',
            items: []
        }
        
        this.add = this.add.bind(this)
        this.delete = this.delete.bind(this)
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        fetch("/data")
        .then((res) => res.json())
        .then(json => {
            if(!json.error) {
                this.setState({items: json})
            } else {
                this.setState({error : json.error})
            }
        })
    }
    
    add() {
        if (this.state.title.length === 0|| this.state.description.length === 0) {
            this.setState({error: 'Fill Out Fields'})
            return
        }

        fetch("/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title: this.state.title, 
            description: this.state.description
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            if(!json.error) {
                this.setState({
                    items: json,
                    description: '',
                    title: '',
                    error: ''
                })
            } else {
                this.setState({error : json.error})
            }
        })
    }

    delete(_id) {
        fetch("/remove", {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id }),
        })
        .then((res) => res.json())
        .then((json) => {
            if(!json.error) {
                this.setState({items: json})
            } else {
                this.setState({error : json.error})
            }
        });
    }

    update(_id) {
        const item = this.state.items.find(i => i._id === _id)

        fetch("/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: item._id,
                title: item.title,
                description: item.description
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            if(!json.error) {
                this.setState({items: json})
            } else {
                this.setState({error : json.error})
            }
        });
    }

    

	render() {
		

		return (<div>
            <h1>Flash Card App</h1>
            <a href="/auth ">Github Login</a>


            <h3 id="error" className="red">
                {this.state.error}
            </h3>
            <h3>Title</h3>
            <input id="title" value={this.state.title} onChange={e => {
                this.setState({title: e.target.value})
            }}/> 
            <h3>Description</h3>
            <textarea id="description" value={this.state.description} onChange={e => {
                this.setState({description: e.target.value})
            }}></textarea>
            
            <button id="submit" onClick={this.add}>Add</button>

            <h3>Cards</h3>
            <div id="cards">
                {this.state.items.map((i,j) => {
                    return(
                        <blockquote key={i._id}>
                            <input value={i.title} onChange={e => {
                                i.title = e.target.value
                            }}/>
                            <br/>
                            <br/>
                            <textarea value={i.description} onChange={e => {
                                var items = this.state.items.slice()
                                items[j].description = e.target.value
                                this.setState({items})
                            }}>
                            </textarea>

                            <button onClick={() => this.update(i._id)}>Save</button>
                            <button className="red" onClick={()=> this.delete(i._id)}>
                                Delete
                            </button>
                        </blockquote>
                    )
                })}
            </div> 
        </div>
		);
	}
}

const domContainer = document.querySelector("#react-container");
ReactDOM.render(<App/>, domContainer);
