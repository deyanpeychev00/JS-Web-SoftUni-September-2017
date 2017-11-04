import React, {Component} from 'react';
import PokemonField from "./formFields/PokemonField";
import Input from "./formFields/Input";

export default class PokeIndex extends Component {
    constructor() {
        super();

        this.state = {
            pokemonName: '',
            pokemonImg: '',
            pokemonInfo: '',
            data: {pokemonCollection: []}
        };

        this.createPokemon = this.createPokemon.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:5000/pokedex/pokedex').then((res) => {
            return res.json();
        }).then((d) => {
            this.setState({data: d});
        });
    }

    createPokemon(e) {
        e.preventDefault();

        let payload = {
            pokemonName: this.state.pokemonName,
            pokemonImg: this.state.pokemonImg,
            pokemonInfo: this.state.pokemonInfo,
        };
        this.resData(payload);
    }

    resData(payload) {

        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            console.log('Pokeees before json!');
            return res.json()
        }).then(d => {
        });

        this.displayPokemons()
    }

    displayPokemons() {
        fetch('http://localhost:5000/pokedex/pokedex').then((res) => {
            return res.json();
        }).then((d) => {
            this.setState({data: d});
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.createPokemon}>
                    <fieldset className='App'>

                        <Input data='pokeName' name='Pokemon Name' func={e => {
                            this.setState({pokemonName: e.target.value})
                        }} valid={this.state.pokemonName !== ''}/>

                        <Input data='pokeImage' name='Pokemon Image' func={e => {
                            this.setState({pokemonImg: e.target.value})
                        }} valid={this.state.pokemonImg !== ''}/>

                        <Input data='pokeBio' name='Pokemon Biography' func={e => {
                            this.setState({pokemonInfo: e.target.value})
                        }} valid={this.state.pokemonInfo !== ''}/>

                        <span
                            style={({"display": (this.state.pokemonInfo !== '' && this.state.pokemonImg !== '' && this.state.pokemonName !== '') === true ? 'none' : ''})}
                        >
                        Please enter valid data in order to create the pokemon.
                    </span>

                        <input
                            style={({"display": (this.state.pokemonInfo !== '' && this.state.pokemonImg !== '' && this.state.pokemonName !== '') === true ? '' : 'none'})}
                            type='submit'
                            value='Create Pokemon'
                        />

                    </fieldset>
                </form>
                <div style={({display: 'inline-block'})}>
                    {this.state.data.pokemonCollection.map((pokemon, index) => {
                        return <PokemonField key={index} data={pokemon}/>
                    })}
                </div>
            </div>
        );
    }
}