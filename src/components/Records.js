import React, { Component } from 'react';
import Record from './Record';
import axios from 'axios';
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
    axios.get("localhost:3004/records").then(
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

    if(error){
      return <div>Error: {error.message}</div>;
    }else if (!isLoaded) {
      return <div>loading...</div>;
    }else {
      return (
        <div>
          <h2>Records</h2>
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
  
        </div>
      );
    }
  }
}

export default Records;
