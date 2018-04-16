import React, { Component } from 'react';
import Record from './Record';

class Records extends Component {
  constructor() {
    super();
    this.state = {
      records: [
        {
          "id": 1,
          "date": "2017-03-17",
          "title": "income",
          "amount": 20
        },
        {
          "id": 2,
          "date": "2017-03-17",
          "title": "outcome",
          "amount": 20
        },
        {
          "id": 3,
          "date": "2017-03-17",
          "title": "income",
          "amount": 20
        }
      ]
    }
  }


  render() {



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
            {this.state.records.map((record) => <Record record={record} />)}
          </tbody>
        </table>

      </div>
    );
  }
}

export default Records;
