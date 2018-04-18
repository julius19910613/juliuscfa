import React, { Component } from 'react';



export default class RecordForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: "",
            title: "",
            amount: ""
        }
    }

    handleChange(event) {
        let name, obj;
        name = event.target.name;

        this.setState ((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ))
    }

    valid() {
        return this.state.date && this.state.title && this.state.amount;
    }

    handleSubmit(event){
        event.preventDefault();
    }

  render() {
    return (
      <form className="form-inline mb-3" onSubmit = {this.handleSubmit.bind(this)}>
      <div className="form-group mr-1">
        <input type="text" className="form-control" onChange = {this.handleChange.bind(this)}placeholder="Date" name = "date"/> 
      </div>
      <div className="form-group mr-1">
        <input type="text" className="form-control" onChange = {this.handleChange.bind(this)} placeholder="Title" name = "title"/> 
      </div>
      <div className="form-group mr-1">
        <input type="text" className="form-control" onChange = {this.handleChange.bind(this)} placeholder="Amount" name = "amount"/> 
      </div>
        <button type = "submit" disabled = {!this.valid()} className="btn btn-primary">Create Record</button>

      </form>
    );
  }
}

