import React, {Component} from 'react';
import FurniturePartial from "../../partials/furniture/FurniturePartial";

export default class FurnitureList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isDeletable, furniture } = this.props;
        return (
            <div className="row space-top">
                {furniture.map(f => {
                    return (
                        <FurniturePartial
                            key={f.id}
                            id={f.id}
                            make={f.make}
                            model={f.model}
                            price={f.price}
                            image={f.image}
                            isDeletable={isDeletable}
                        />
                    )
                })}
            </div>

        )
    }
}