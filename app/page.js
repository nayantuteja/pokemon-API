'use client'

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        console.log("Data", data);
        setPokemon(data.results);
      } catch (error) {
        console.error('Error fetching PokÃ©mon data:', error);
      }
    };
    fetchPokemon();
  }, [limit, offset]);

  const handleNext = () => {
    setOffset(offset + limit);
  };

  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <>
    <div className='flex felx-col h-screen'>
    <div className="pikka">
      <h1>Pokemon</h1>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 ml-2 mr-2">
        {pokemon.map((poke, index) => (
          <div key={index} className="card bg-gradient-to-b from-purple-200 to-fuchsia-300 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2 mx-20">{poke.name}</h2>
            <PokemonImage poke={poke.url} />
            <p className="mb-2">
              <PokemonDetails url={poke.url} />
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
          disabled={offset === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
    </div>
    </>
  );
}

const PokemonImage = ({ poke }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(poke);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchDetails();
  }, [poke]);

  return (
    <img
      src={pokemonDetails?.sprites?.other?.dream_world?.front_default }
      alt={pokemonDetails?.name}
      className="w-300 h-40 rounded-md mb-2 mx-auto "
      onError={() => setImageError(true)}
    />
  );
};

const PokemonDetails = ({ url }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchDetails();
  }, [url]);


  return (
    <>
 <span className="font-bold">Type: </span>    
       {details?.types?.map((type, i) => (
        <span key={i}>{type.type.name}{i < details.types.length - 1 && ', '}</span>
      ))}
      <br />
      <span className="font-bold">Abilities: </span>
      {details?.abilities?.map((ability, i) => (
        <span key={i}>{ability.ability.name}{i < details.abilities.length - 1 && ', '}</span>
      ))}
      <br/>
      <span className="font-bold">Height: </span>
      {details?.height && `${details.height}`
      }
      <br />
      <span className="font-bold">Abilities: </span>
      {details?.moves?.slice(0,5).map((move, i) => (
        <span key={i}>{move.move.name}{i < 4 && ', '}</span>
      ))}
    </>
  );
};