import { useEffect, useState } from "react";
import { TbPokeball } from 'react-icons/tb'
import "./card.css";
import { Link } from "react-router-dom";

function PokemonCard({ url }) {
  const [pokemon, setPokemon] = useState();

  const pokemonTypes = {
    normal: "#d4cfc5",
    water: "#3899f8",
    fire: "#f05030",
    grass: "#78c850",
    electric: "#f8d030",
    rock: "#b8a058",
    steel: "#a8a8c0",
    fairy: "#e79fe7",
    psychic: "#f870a0",
    dark: "#7a5848",
    ghost: "#6060b0",
    flying: "#98a8f0",
    bug: "#a8b820",
    fighting: "#a05038",
    ground: "#e9d6a4",
    ice: "#58c8e0",
    dragon: "#7860e0",
    poison: "#b058a0",
  };

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => setPokemon(data));
  },[url]);

  return (
    <div>
      {pokemon ? (
        <Link to={`/${pokemon.id}`} style={{color: 'initial'}}>
        <div className="pokemonCard" style={{ background: `linear-gradient(${pokemonTypes[pokemon.types[0].type.name]}, #fff 110%)`}}>
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt={`${pokemon.name}_image`} />
          <div className="number">
            <TbPokeball/> 
            <p>#{pokemon.id}</p>
          </div>
          <h2>{pokemon.name.toUpperCase()}</h2>
          {pokemon.types.map((type, index) => {
            return (
              <p
                className="badge_type"
                key={index}
                style={{ backgroundColor: pokemonTypes[type.type.name] }}
              >
                {type.type.name}
              </p>
            );
          })}
        </div></Link>
      ) : (
        <img
          src="https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif"
          className="loading_img"
        />
      )}
    </div>
  );
}

export default PokemonCard;
