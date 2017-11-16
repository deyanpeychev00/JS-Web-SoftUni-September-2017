import React, {Component} from 'react';

export default class CreateFurniture extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Create New Furniture</h1>
                            <p>Please fill all fields.</p>
                        </div>
                    </div>
                    <form>
                        <div className="row space-top">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-control-label" for="new-make">Make</label>
                                    <input className="form-control" id="new-make" type="text"/>
                                </div>
                                <div className="form-group has-success">
                                    <label className="form-control-label" for="new-model">Model</label>
                                    <input className="form-control is-valid" id="new-model" type="text"/>
                                        <div className="form-control-feedback">This input value is valid</div>
                                </div>
                                <div className="form-group has-danger">
                                    <label className="form-control-label" for="new-year">Year</label>
                                    <input className="form-control is-invalid" id="new-year" type="number"/>
                                        <div className="form-control-feedback">This input value is invalid</div>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" for="new-description">Description</label>
                                    <input className="form-control" id="new-description" type="text"/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-control-label" for="new-price">Price</label>
                                    <input className="form-control" id="new-price" type="number"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" for="new-image">Image</label>
                                    <input className="form-control" id="new-image" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" for="new-material">Material (optional)</label>
                                    <input className="form-control" id="new-material" type="text"/>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Create" />
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}