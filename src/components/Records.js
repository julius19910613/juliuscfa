import React, { Component } from 'react';
import Record from './Record';
import axios from 'axios';
import RecordForm from './RecordForm';
import * as RecordsAPI from '../utils/RecordsAPI'

class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }

  componentDidMount() {
    RecordsAPI.getAll().then(
      response => {
        this.setState({
          records: response.data,
          isLoaded: true
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
              </tr>
            </thead>
            <tbody>
              {this.state.records.map((record) =>
                <Record key={record.id} {...record}  />)}
            </tbody>
          </table>     
      );
    }

    return (
      <div>
      <h2>Records</h2>
      <RecordForm />
      {recordsComponent}
      </div>

    )


  }
}

export default Records;
