import React, { Component } from 'react';
import './App.css';

class Itemlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: []
        }
    }

    async getItems() {
        fetch('/items')
            .then(res => res.json())
            .then(items => this.setState({ items: items }));
    }

    componentDidMount() {
        fetch('/items')
            .then(res => res.json())
            .then(items => this.setState({ items }));
    }

    async addItem(e) {
        const userText = document.getElementById("userInput")
        let newItem = userText.value;
        //let user = "testuser"; //this will be the user's username

        fetch("/addItem", {
            method: "POST",
            body: JSON.stringify({ dream: newItem }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => this.getItems())
        // reset form
        userText.value = "";
        this.getItems()
    }

    async modifyItem(item) {
        console.log(item)
        const userText = document.getElementById("userInput")
        if (userText.value === "") {
            this.deleteItem(item._id);
        }
        else {
            this.editItem(item._id);
        }
        this.getItems()
    }

    async editItem(id) {
        const userText = document.getElementById("userInput")
        let newEdit = userText.value;

        fetch("/edit", {
            method: "POST",
            body: JSON.stringify({ dream: newEdit, id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => this.getItems());
        this.getItems()
    }

    async deleteItem(id) {
        fetch("/delete", {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => this.getItems());
        this.getItems()
    }

    //{this.state.items.map(item => <div key={item._id}>{item.dream}</div>)}
    render() {
        return (
            <div>
                <body>
                    <header>
                        <h1>Virtual Shopping List</h1>
                    </header>
                    <main>
                        <label>
                            New Grocery Item
                                <input
                                name="dream"
                                type="text"
                                id="userInput"
                                maxlength="100"
                                required
                                placeholder="Type item here!"
                            />
                        </label>
                        <button type="submit" id="submit-dream" onClick={e => this.addItem(e)}>Add Item</button><br /><br />

                        <section class="dreams">
                            <ul id="dreams">
                                {this.state.items.map(item => {
                                    return <li key={item._id} onClick={e => this.modifyItem(item)}>{item.dream}</li>
                                }
                                )}
                            </ul>
                        </section>

                            To edit item, enter replacement value in item box and click the list item to edit.<br />
                            To remove item, click a list item to remove with nothing in the item input box.<br /><br />

                        
                    </main>
                </body>
            </div>
        )
    }
}

export default Itemlist