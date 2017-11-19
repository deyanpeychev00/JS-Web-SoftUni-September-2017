import React, {Component} from 'react';
import {calendar} from "../../utils/calendar";
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';
import {postExpense} from "../../api/remote";

export default class AddExpenses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: "Non-essential"
        };

        this.changeExpenseField = this.changeExpenseField.bind(this);
        this.addExpense = this.addExpense.bind(this);
    }

    changeExpenseField(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async addExpense(e){
        e.preventDefault();
        this.state.amount = Number(this.state.amount);
        this.state.date = Number(this.state.date);
        const res = await postExpense(this.state, this.props.match.params.month);
        if(res.success){
            toastr.success(res.message);
            setTimeout(() => {window.location.replace('/balance/monthly/' + this.props.match.params.month)}, 1000);
        }else{
            console.log(res.errors);
            toastr.error(res.message);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Add Expenses</h1>
                        <div className="center">
                            <h2 className="info">{calendar.calendar[this.props.match.params.month]}: {this.props.match.params.year}</h2>
                        </div>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="center">
                        <form onSubmit={this.addExpense}>
                            <div className="center">
                                <h2 className="info">Add a new expense</h2>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="name">Name:</label><br/>
                                <input onChange={this.changeExpenseField} className="col-md-2" name="name" type="text"/>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="category">Category:</label><br/>
                                <select onChange={this.changeExpenseField} className="col-md-2 pl-2" name="category">
                                    <option onChange={this.changeExpenseField}  name="category" value="Non-essential">Non-essential</option>
                                    <option onChange={this.changeExpenseField}  name="category" value="Fixed">Fixed</option>
                                    <option onChange={this.changeExpenseField}  name="category" value="Variable">Variable</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="cost">Amount:</label><br/>
                                <input onChange={this.changeExpenseField} className="col-md-2" name="amount" type="number"/>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="paymentDate">Payment Day:</label><br/>
                                <input onChange={this.changeExpenseField} className="col-md-2" name="date" type="text"/>
                            </div>
                            <input type="submit" className="btn btn-secondary" value="Add"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}