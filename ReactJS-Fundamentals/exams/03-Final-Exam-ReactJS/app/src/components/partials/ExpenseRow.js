import React, {Component} from 'react';
import {removeExpense} from "../../api/remote";
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';

export default class ExpenseRow extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.deleteExpense = this.deleteExpense.bind(this);
    }

    async deleteExpense(e){
        e.preventDefault();
        const res = await removeExpense(this.props.expense.id);
        if(res.success){
            toastr.success(res.message);
            window.location.replace('/balance/monthly/' + this.props.expense.month);
        }else{
            console.log(res.errors);
            toastr.error(res.message);
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.expense.name}</td>
                <td>{this.props.expense.category}</td>
                <td>{this.props.expense.amount}.00</td>
                <td>{this.props.expense.date}-{this.props.expense.month}-{this.props.expense.year}</td>
                <td>
                    <form onSubmit={this.deleteExpense}>
                        <input type="submit" className="delete" value="Delete"/>
                    </form>
                </td>
            </tr>
        );
    }
}