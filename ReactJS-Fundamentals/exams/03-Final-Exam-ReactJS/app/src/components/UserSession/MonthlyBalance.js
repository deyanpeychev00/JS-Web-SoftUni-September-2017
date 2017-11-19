import React, {Component} from 'react';
import {getMonthlyBallance, updateMonthIncome} from "../../api/remote";
import {calendar} from "../../utils/calendar";
import ExpenseRow from "../partials/ExpenseRow";
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';

export default class MonthlyBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            budget: 0,
            expenses: [],
            income: 0,
        };

        this.updatePlanner = this.updatePlanner.bind(this);
        this.changePlanner = this.changePlanner.bind(this);
    }

    async componentDidMount() {
        const res = await getMonthlyBallance(this.props.match.params.monthId);
        this.setState(res);
    }

    changePlanner(e) {
        this.setState({[e.target.name]: Number(e.target.value)});
        console.log(this.state);
    }

    async updatePlanner(e) {
        e.preventDefault();
        let obj = {
            income: this.state.income,
            budget: this.state.budget
        };
        const res = await updateMonthIncome(obj, this.props.match.params.monthId);
        if(res.success){
            toastr.success(res.message);
            setTimeout(() => {window.location.replace('/balance/monthly/' + this.props.match.params.monthId)}, 2000);
        }else{
            toastr.error(res.message);
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Monthly ballance</h1>
                <div className="center">
                    <h2 className="info" id="month">{calendar.calendar[this.props.match.params.monthId]}
                          : 2017</h2>
                </div>
                <div>
                    <div className="card-wide">
                        <div className="card-body">
                            <blockquote className="card-blockquote">
                                <div className="row">
                                    <div className="col-md-3 space-top">
                                        <h4>Planner</h4>
                                        <form onSubmit={this.updatePlanner}>
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="income">Income:</label>
                                                <input onChange={this.changePlanner} className="form-control"
                                                       name="income" type="number" value={this.state.income}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="budget">Budget:</label>
                                                <input onChange={this.changePlanner} className="form-control"
                                                       name="budget" type="number" value={this.state.budget}/>
                                            </div>
                                            <input type="submit" className="confirm" value="Save"/>
                                        </form>
                                    </div>
                                    <div className="col-md-8 space-top">
                                        <div className="row">
                                            <h4 className="col-md-9">Expenses</h4>
                                            <a href={`/plan/${new Date().getFullYear()}/${this.props.match.params.monthId}/expense`} className="button">Add expenses</a>
                                        </div>
                                        <br/>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Amount</th>
                                                <th>Payment Date</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.expenses.map((exp, index) => {
                                                return <ExpenseRow key={index} expense={exp}/>
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}