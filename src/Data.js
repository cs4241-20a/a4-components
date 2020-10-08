import React from 'react'
import NavBar from './NavBar'
import axios from "axios"
export default class Data extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listOfCards: [], //continue adding to this list when things come up...
        }
    }
    addCard(e) {
        e.preventDefault()
        const username = window.localStorage.username;
        const inputs = document.getElementsByClassName('addCard')
        const rarity = document.querySelector('input[name="rarity"]:checked').value
        axios.post('/addcard', {username, name:inputs[0].value, manacost:inputs[1].value, type:inputs[2].value,abilities:inputs[3].value,flavortext:inputs[4].value,rarity})
        .then(res=> {
            Array.prototype.slice.call( inputs ).map(i=>i.value='')
            this.setState({listOfCards: [
                ...this.state.listOfCards, res.data
            ]})
        })
    }
    editCard(id, i) {
        const tds = document.querySelector('#hidden_'+i).parentElement.getElementsByTagName('td')
        const username = window.localStorage.username
        axios.post('/editcard', {id, username, name:tds[0].innerText, manacost:tds[1].innerText, type:tds[2].innerText,abilities:tds[3].innerText,flavortext:tds[4].innerText,rarity:tds[5].innerText})
        .then(res=> {
            this.setState({
                listOfCards:res.data
            })
        })
    }
    deleteCard(id) {
        const username = window.localStorage.username
        axios.post('/deletecard', {id, username})
        .then(res=> {
            this.setState({
                listOfCards:res.data
            })
        })

    }
    componentDidMount() {
        if(localStorage.getItem('username') == null) {
          console.log('good?')
          axios.get('/auth/user')
        .then(res=>{
            console.log(res)
            console.log(res.data)
          localStorage.setItem('username', res.data.username)
            const username = window.localStorage.username;
          axios.post('/load', {username})
          .then(res=> {
              this.setState({listOfCards: res.data})
          })
        })
        } else {
          
          const username = window.localStorage.username;
          axios.post('/load', {username})
          .then(res=> {
              this.setState({listOfCards: res.data})
          })
        }
        
      }
    render() {
        const username = window.localStorage.username;
        return (
            <div>
                <NavBar name={username}/>
        <div className="container">
            <div className="jumbotron">
        <h1>{username}'s Custom Cards</h1>
            </div>
            
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Mana Cost</th>
                        <th>Card Type</th>
                        <th>Abilities</th>
                        <th>Flavor Text</th>
                        <th>Rarity</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.listOfCards.map((card, i) =>
                    <tr onMouseOver={()=> { Array.prototype.slice.call(document.querySelector('#hidden_'+i).childNodes).map( c => c.style.visibility = 'visible') }} onMouseLeave={()=> Array.prototype.slice.call(document.querySelector('#hidden_'+i).childNodes).map( c => c.style.visibility = 'hidden') }>
                        <td>{card.name}</td>
                        <td>{card.manacost}</td>
                        <td>{card.type}</td>
                        <td>{card.abilities}</td>
                        <td>{card.flavortext}</td>
                        <td>{card.rarity}</td>
                        <td className="modify" id={"hidden_" + i}><input type="button" value="edit" onClick={()=>{
                            if(document.querySelector('#hidden_'+i).childNodes[0].value==='edit') {
                                document.querySelector('#hidden_'+i).parentElement.contentEditable = true
                                document.querySelector('#hidden_'+i).childNodes[0].value = 'save'
                            } else {
                                document.querySelector('#hidden_'+i).parentElement.contentEditable = false
                                document.querySelector('#hidden_'+i).childNodes[0].value = 'edit'
                                this.editCard(card._id, i)
                            }
                        }
                            }/><input type="button" value="del" onClick={() => {
                                this.deleteCard(card._id)
                            }}/></td>
                    </tr>
                        )}
                </tbody>
            </table>
            <br/>
            <h2>Add a card below:</h2>
            <br/>
            <form>
                <div className="row text-right">
                    <div className="col-sm-4">
                        <label for="name">Name</label>
                        <input className='addCard' type='text' id="name" name="name"/>
                    </div>
                    <div className="col-sm-4">
                        <label for="manacost">Mana Cost</label>
                        <input className='addCard' type='text' id="manacost" name="manacost"/>
                    </div>
                    <div className="col-sm-4">
                        <label for="cardtype">Card Type</label>
                        <input className='addCard' type='text' id="cardtype" name="cardtype"/>
                    </div>
                </div>
                <div className="row text-right">
                    <div className="col-sm-4">
                        <label for="abilities">Abilities</label>
                        <textarea className='addCard' id="abilities" name="abilities"></textarea>
                    </div>
                    <div className="col-sm-4">
                        <label for="flavortext">Flavor Text</label>
                        <textarea className='addCard' id="flavortext" name="flavortext"></textarea>
                        <br/><br/>
                        <input type="submit" value="Forge My Card" id="addCard" onClick={this.addCard.bind(this)}/>
                    </div>
                    <div className="col-sm-4 text-center">
                        <label>Rarity</label>
                        <div className="text-left row">
                            
                        <div className="col-sm-7">
                            <input type="radio" id="common" name="rarity" value="common"/>
                            <label for="common">Common</label><br/>
                            <input type="radio" id="uncommon" name="rarity" value="uncommon"/>
                            <label for="uncommon">Uncommon</label><br/>
                        </div>
                        <div className="col-sm-5">
                            <input type="radio" id="rare" name="rarity" value="rare"/>
                            <label for="rare">Rare</label><br/>
                            <input type="radio" id="mythic" name="rarity" value="mythic"/>
                            <label for="mythic">Mythic</label>
                        </div>
                    </div>
                    </div>
                </div>
            </form>
            <br/>
            <br/>
        </div>
            </div>
        )
    }
}