import React, { Component } from 'react';


export default class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label, max, min } = this.props;
        if(max || min){
            return (
                <div>
                    <label htmlFor="new-email">{label}</label><br/>
                    <input
                        onChange={onChange}
                        name={name}
                        id={name}
                        type={type}
                        value={value}
                        placeholder={name}
                        max={max}
                        min={min}
                    />
                </div>
            );
        }else{
            return (
                <div>
                    <label htmlFor="new-email">{label}</label><br/>
                    <input
                        onChange={onChange}
                        name={name}
                        id={name}
                        type={type}
                        value={value}
                        placeholder={name}
                    />
                </div>
            );
        }

    }
}