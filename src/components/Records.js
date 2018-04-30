import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import * as RecordsAPI from '../utils/RecordsAPI'
//import AccountBox from './AccountBox';
import AmountBox from './AccountBox';
import AccountFilter from './AccountFilter';

class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: [],
      DateVH: [],
      TitleVH: [],
      AmountVH: []
    }
  }

  componentDidMount() {
    RecordsAPI.getAll().then(
      response => {

        let dateSet = ['*'];
        response.data.map((dateObj) => 
          dateSet.push(dateObj.date)
        );

        dateSet = Array.from(new Set(dateSet));

        let titleSet = ['*'];
        response.data.map((titleObj) => 
          titleSet.push(titleObj.title)
        );

        titleSet = Array.from(new Set(titleSet));

        let amountSet = ['*'];
        response.data.map((amountObj) => 
          amountSet.push(amountObj.amount)
        );

        amountSet = Array.from(new Set(amountSet));


        this.setState({
          records: response.data,
          isLoaded: true,
          DateVH: dateSet,
          TitleVH: titleSet,
         AmountVH: amountSet
    
        })
      }
    )
    .catch(
      (error)=> {
        this.setState({
          records: [],
          isLoaded: true
        }

        )
      }

    )


  }

  addRecord(record) {
    this.setState({
      error: null,
      isLoaded: true,
      records: [
        ...this.state.records,
        record
      ]
    })
  }

  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords= this.state.records.map( (item, index) => {
      if(index !== recordIndex) {
        return item;
      }

      return {
        ...item,
        ...data
      };
    });

    this.setState({
        records: newRecords
    });

  }

  deleteRecord(record) {

    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter( (item, index) => index !== recordIndex);
    this.setState({
      error: null,
      isLoaded: true,
      records: newRecords
    });


  }

  credits() {
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  debits() {
    let debits = this.state.records.filter((record) => {
      return record.amount < 0;
    })
    return debits.reduce((prep, curr) => {
      return prep + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  balance() {
    return this.credits() + this.debits();
  }


  render() {

    const { error, isLoaded, records } = this.state;
    let recordsComponent;

    if(error){
      recordsComponent = <div>Error: {error.message}</div>;
    }else if (!isLoaded) {
      recordsComponent = <div>loading...</div>;
    }else {
      recordsComponent = (        
          <table className="table table-bordered">
            <thead>
              <tr>
                <td>Date</td>
                <td>Time</td>
                <td>Amount</td>
                <td>Operation</td>
              </tr>
            </thead>
            <tbody>
              {this.state.records.map((record) =>
                <Record 
                  key={record.id} 
                  record = {record} 
                  handleEditRecord = {this.updateRecord.bind(this)} 
                  handleDeleteRecord = {this.deleteRecord.bind(this)}
                />)}
                  
            </tbody>
          </table>     
      );
    }

    return (
      <div>
      <h2>Records</h2>
      <div className="row mb-3">
        <AmountBox text="Credit" type="success" amount={this.credits()} />
        <AmountBox text="Debit" type="danger" amount={this.debits()} />
        <AmountBox text="Balance" type="info" amount={this.balance()} />
      </div>

      <AccountFilter DateVH = {this.state.DateVH}  TitleVH = {this.state.TitleVH} AmountVH = {this.state.AmountVH}/>

      <RecordForm handleRecord={this.addRecord.bind(this)} />
      {recordsComponent}
      </div>

    )


  }
}

export default Records;
