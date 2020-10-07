import React, { Component } from 'react'
import StoreItem from './StoreItem'
var dragula = require('react-dragula');

let storeItems = [
    {id: 0, img: "img/item1.png", imgAlt: "First Item", name: "First Item", price: "1"},
    {id: 1, img: "img/item2.png", imgAlt: "Second Item", name: "Second Item", price: "2"},
    {id: 2, img: "img/item3.png", imgAlt: "Third Item", name: "Third Item", price: "3"}]

function changePassword(){
    window.open('/changePassword', "_self")
}
function logOut(){
    fetch('/logOut', {
      method:'POST'
    }).then(() => {
      window.open('/', "_self");
    })
    
}

export class StorePage extends Component {
    constructor(props){
        super(props);
        this.state = {currentBasket: [], username: ''};

    }

    componentDidMount(){
        dragula([document.getElementById('items'), document.getElementById('basket')])
        .on('drop', function(el, target, source){
            console.log(el)
            console.log(target)
            if (target.id == 'basket'){//putting into basket
              let body = {'newItem': Number(el.id)}
              fetch( '/addToBasket', {
                method:'POST',
                body : JSON.stringify( body ),
                headers:{
                    "Content-Type": "application/json"
                }
              })
            } else {//remove from basket
              let body = {'newItem': Number(el.id)}
              fetch( '/removeFromBasket', {
                method:'POST',
                body : JSON.stringify( body ),
                headers:{
                    "Content-Type": "application/json"
                }
              })
            }
          });;
        this.fillItems()
    }

    fillItems(){
        let tempThis = this;
        fetch( '/currentUser', {
            method:'GET'
        }).then(function(response){
            console.log(tempThis)
            return response.json();
        }).then(function(json){
            console.log(tempThis)
            tempThis.setState({username: json.username});
            tempThis.setState({currentBasket: json.basket});
        });
    }

    render() {
        console.log(this.state.currentBasket)
        return (
            <div>
                <div className = "headerBar">
                <h1 className="title is-1 mb-0">Store</h1>
                <div style = {{display: 'flex'}}>
                    <p className = "content is-medium mb-0 mr-2 " id = "welcomeText">{`Hello ${this.state.username}`}</p>
                    <button className = "content is-medium mb-0" id = 'changePass' onClick = {changePassword}>Change password</button>
                    <button className = "content is-medium mb-0" id = 'logOut' onClick = {logOut}>Logout</button>
                </div>
                
                </div>
            
                <div className = "columns" >
                    <div className = "column"  style={{flex: 'auto'}}>
                        <h1 className = "title has-text-centered">
                            Store
                        </h1>
                        <div id = "items" className="bucket">
                            {storeItems.map(function(item){
                                if (this.state.currentBasket.indexOf(item.id) == -1){
                                    return(<StoreItem
                                        id = {item.id}
                                        imgSrc = {item.img}
                                        imgAlt = {item.imgAlt}
                                        name = {item.name}
                                        price = {item.price}
                                        />);
                                } 
                            }, this)}
                        </div>
                    </div>
                    <div className = "column" >
                        <h1  className = "title has-text-centered">
                            Basket
                        </h1>
                        <div id = "basket" className="bucket">
                            {storeItems.map(function(item){
                                if (this.state.currentBasket.indexOf(item.id) != -1){
                                    return (
                                    <StoreItem
                                    id = {item.id}
                                    imgSrc = {item.img}
                                    imgAlt = {item.imgAlt}
                                    name = {item.name}
                                    price = {item.price}
                                    />);
                                } 
                            }, this)}
                        </div>
                    </div>
                </div>
                <script src="dragula.js"></script>
            </div>
        )
    }
}

export default StorePage
