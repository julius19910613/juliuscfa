import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Records extends Component {

  constructor(){
    super();
    this.state ={
      edit: false
    };
  }


  // changeTable() {
  //   if()

  // }


  recordRow() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.title}</td>
        <td>{this.props.amount}</td>
        <td>
          <button className="btn btn-info mr-1" >Update</button>
          <button className="btn btn-danger">Delete</button>          
        </td>
      </tr>
    );
  }

  recordForm() {
    return (

      <tr>
        <td>
          <input type="text" className="form-control" defaultValue = {this.props.date} />
        </td>
        <td>
        <input type="text" className="form-control" defaultValue = {this.props.title} />
        </td>
        <td>
        <input type="text" className="form-control" defaultValue = {this.props.amount} />
        </td>
        <td>
          <button className="btn btn-info mr-1" >Update</button>
          <button className="btn btn-danger">Delete</button>          
        </td>
      </tr>


    );
  }


  render() {
    if(this.state.edit){
      return this.recordForm();
    }else{
      return this.recordRow();
    }
  }
}

 Records.propTypes = {
   id: PropTypes.number,
   date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
 }