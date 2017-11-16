import React, {Component} from 'react';

export default class FurniturePartial extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const {id, image, make, model, price, isDeletable} = this.props;
        if (isDeletable) {
            return (
                <div className="col-md-4">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <blockquote className="card-blockquote">
                                <img src={image}/>
                                <p>{`${make}: ${model}`}</p>
                                <footer>Price:
                                    <cite title="Source Title">{" $" + price}</cite>
                                </footer>
                                <div className="pull-right">
                                    <a href={"/details/"+id} className="btn btn-info">Details</a>
                                    <a href={"/delete/"+id} className="btn btn-danger">Delete Item</a>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col-md-4">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <blockquote className="card-blockquote">
                                <img src={image}/>
                                <p>{`${make}: ${model}`}</p>
                                <footer>Price:
                                    <cite title="Source Title">{" $" + price}</cite>
                                </footer>
                                <div className="pull-right">
                                    <a href={"/details/"+id} className="btn btn-info">Details</a>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            )
        }
    }
}