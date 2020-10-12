import React from 'react';
import { Container, Button, Form, Label, Input, FormGroup } from 'reactstrap'
import Header from './common/header'
import ErrorMsg from './common/errMsg'
import Subtitle from './common/subtitle'
import AdvancedTable from './AdvancedTable'


let globalChildData
let globalUpdate2 = React.createContext()


function renderTable(showTable, data, clear) {
    if (showTable) {
        return (
            <div>
                <AdvancedTable data={JSON.stringify(data)} childCallback={handleCallback} clear={clear}/>
                <Button onClick={ deleteSelected } className="mb-5">Delete Selected Rows</Button>
            </div>
        )
    }
}

function handleCallback (childData) {
    globalChildData = childData
}


function deleteSelected() {
    // Create json obj
    let jsonObjs = []
    for (let obj in globalChildData) {
        jsonObjs.push({_id: globalChildData[obj]})
    }

    if (globalChildData !== []) {
        fetch('/delete', {
            method: 'POST',
            body: JSON.stringify(jsonObjs),
            headers: {
                "Content-Type": "application/json"
            }
        })
        globalUpdate2.callback()
    }   
}



export default class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user: "", 
          btnText: "Show all bills",
          errorMsgText: "", 
          data: [], 
          name: "", 
          amt: 0, 
          date: "", 
          paid: false, 
          showTable: false, 
          childData: "none",
          globalChildData: []
        }
        this.allBillBtn = React.createRef()
        this.billForm = React.createRef()
        this.table = React.createRef()

        this.getAllBills = this.getAllBills.bind(this)
        this.submit = this.submit.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleAmtChange = this.handleAmtChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handlePaidChange = this.handlePaidChange.bind(this)
        this.expandTable = this.expandTable.bind(this)
    }


    componentDidUpdate() {
        globalUpdate2.callback = () => {
            this.getAllBills()
            renderTable(this.state.showTable, this.state.data, true)

        }
    } 

    componentDidMount() {
        fetch('/read', {
            method: 'GET'
            })
            .then(response => response.json())
            .then(json => {
                // Set welcome message for user
                this.setState({
                    user: json.username
                })
                console.log(json.username)
            }) 

        this.getAllBills()
    }
    

    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }
    handleAmtChange(e) {
        this.setState({ amt: e.target.value })
    }
    handleDateChange(e) {
        this.setState({ date: e.target.value })
    }
    handlePaidChange(e) {
        this.setState({ paid: e.target.value })
    }


    submit() {
        if (this.validateForm()) {
            this.setState({ errorMsgText: "" }) 
            this.submitForm()
        }
    }


    validateForm() {
        // Check all fields are filled out 
        if (this.state.name === "") {
            this.setState({ errorMsgText: "Please enter a bill name" }) 
            return false
        } else if (this.state.amt == "") {
            this.setState({ errorMsgText: "Please enter a bill amount" }) 
            return false
        } else if (this.state.date === "") {
            this.setState({ errorMsgText: "Please enter a date" }) 
            return false
        } 
        return true
    }


    // Submit form data to server + DB
    submitForm() {
    let status = ""
    let json = {
        billName: this.state.name,
        billAmt: this.state.amt,
        billDate: this.state.date,
        billPay: this.state.paid,
        billUser: this.state.user
    }

    // Attempt add to database
    fetch('/add', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            // Get status code
            status = response.statusText
            // console.log(status)
            return response.json()
        })
        .then(json => {
            // Display error message if duplicate entry
            if (status === "DUPLICATE") {
                let paidStr = "paid"
                if (!json.billPay) {
                    paidStr = "unpaid"
                }
                this.setState({
                    errorMsgText: `Bill ${json.billName} issued on ${json.billDate} for $${json.billAmt} (${paidStr}) already exists. Please enter a unique bill.`
                })
            }
            // Otherwise clear form 
            else if (status === "OK") {
                this.setState({
                    name: "",
                    amt: 0,
                    date: "",
                    paid: false
                })
            }
        }).then(test => {
            this.getAllBills()
        })
}

    expandTable() {
        let btnText = this.state.btnText === "Show all bills" ? "Hide all bills" : "Show all bills"
        let showTable = this.state.showTable === false ? true: false
        this.setState({
            btnText: btnText,
            showTable: showTable
        })
        this.getAllBills()
    }

    getAllBills() {    
        // Retrieve all data from database
        fetch('/results', {
                method: 'POST',
                body: JSON.stringify({
                    user: this.state.user
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    data: json
                })
            })        
    }


    render() {
        return (
            <div>
                <Header/>
                <Subtitle text={"Welcome " + this.state.user}/>
                <Subtitle text="Enter a bill"/>
                <Container>
                    <Form id="billForm" ref={this.billForm}>
                        <FormGroup>
                            <Input type="text" id="name" placeholder="Bill Name" className="form-control" value={this.state.name} onChange={this.handleNameChange} required></Input>
                        </FormGroup>
                        <FormGroup>
                            <Input type="number" id="amt" placeholder="0.00" className="form-control" value={this.state.amt} onChange={this.handleAmtChange} required></Input>
                        </FormGroup>                        
                        <FormGroup>
                            <Input type="date" id="date" className="form-control" value={this.state.date} onChange={this.handleDateChange} required></Input>
                        </FormGroup>
                        {/* <FormGroup>
                            <Input type="checkbox" id="paid" value="true" className="form-control" value={this.state.paid} onChange={this.handlePaidChange} ></Input>
                            <Label for="paid">Paid?</Label>
                        </FormGroup> */}

                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" checked={this.state.paid} onChange={this.handlePaidChange} />{' '}
                            Paid?
                            </Label>
                        </FormGroup>
                    </Form>

                    <ErrorMsg text={this.state.errorMsgText}></ErrorMsg>

                    <Button 
                    className="btn btn-primary btn-block submit mt-2 mb-5"
                    id="loginBtn"
                    type="submit"
                    style={{border: "none"}}
                    onClick={ this.submit }
                    >Submit</Button>

                    <Button onClick={ this.expandTable }>{this.state.btnText}</Button>

                    <br/><br/>

                    { renderTable(this.state.showTable, this.state.data, false) }

                </Container>
            </div>
        )
    }

}

