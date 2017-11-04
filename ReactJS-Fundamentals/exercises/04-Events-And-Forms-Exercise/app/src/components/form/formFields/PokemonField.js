import React, { Component } from 'react'

let PokemonField = (props) => {
  return (
    <div style={({ display: "inline-block", "width": "200px", border: "2px solid orange", padding: "10px"})}>
      <h1>{props.data.pokemonName}</h1>
      <p>{props.data.pokemonInfo}</p>
      <img style={({ "width": "100px" })} alt='pokemon' src={props.data.pokemonImg} />

    </div>
  )
}

export default PokemonField
