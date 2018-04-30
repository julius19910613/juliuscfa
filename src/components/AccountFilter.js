import React, { Component } from 'react';

export default class accountFilter extends Component{
   
   constructor(){
       super();

       this.state = {
           searchVariant: {
               title: "",
               date: "",
               amount: ""
           }
       }
   }
   
    render(){

        return(

            <form className="form-inline mb-3">
            <div className="form-group mr-1">
             <select className="selecpicker" ref = "date">
                {this.props.DateVH.map((date) => 
                    <option value = {date}>{date}</option>
                 )}
             </select>
            </div>
            <div className="form-group mr-1">
             <select className="selecpicker" ref = "title">
                {this.props.TitleVH.map((title) => 
                    <option value = {title}>{title}</option>
                 )}
             </select>
            </div>
            <div className="form-group mr-1">
             <select className="selecpicker" ref = "amount">
                {this.props.AmountVH.map((amount) => 
                    <option value = {amount}>{amount}</option>
                )}
             </select>
            </div>

            <button type = "submit"  className="btn btn-primary">Search</button>

            </form>


        );


    }
}