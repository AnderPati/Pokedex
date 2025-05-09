import { useState, useEffect } from "react";
import './app.css';
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCards";
import TypeEffectivenessTable from "./components/TypeEffectivenessTable";

function App() {
  const [view, setView] = useState("search");
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingPokemon, setLoadingPokemon] = useState(false);

  useEffect(() => {
    const loadPokemonNames = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
      const data = await res.json();
      setPokemonList(data.results.map(p => p.name));
    };
    loadPokemonNames();
  }, []);

  const getTranslatedName = async (url, lang = "es") => {
    const res = await fetch(url);
    const data = await res.json();
    const translated = data.names.find(n => n.language.name === lang);
    return translated ? translated.name : data.name;
  };

  const fetchPokemon = async (overrideName) => {
    const query = overrideName || search;
    if (!query.trim()) {
      setPokemon(null);
      return;
    }
    setView("search");
    setLoadingPokemon(true);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (!res.ok) throw new Error("No encontrado");
      const data = await res.json();

      const speciesRes = await fetch(data.species.url);
      if (!speciesRes.ok) throw new Error("Error en species");
      const speciesData = await speciesRes.json();

      const evolutionChainUrl = speciesData.evolution_chain?.url || null;
      const description = speciesData.flavor_text_entries.find(e => e.language.name === 'es')?.flavor_text || "";

      const levelUpMoves = data.moves.filter(move =>
        move.version_group_details.some(
          v => v.move_learn_method.name === "level-up"
        )
      );

      const translatedAbilities = await Promise.all(
        data.abilities.map(a => getTranslatedName(a.ability.url))
      );

      const translatedStats = await Promise.all(
        data.stats.map(s => getTranslatedName(s.stat.url))
      );

      const translatedTypes = await Promise.all(
        data.types.map(t => getTranslatedName(t.type.url))
      );

      const translatedMoves = await Promise.all(
        levelUpMoves.map(async move => {
          const moveRes = await fetch(move.move.url);
          const moveData = await moveRes.json();

          const translatedName = await getTranslatedName(move.move.url, "es");
          const level = move.version_group_details.find(
            (v) => v.move_learn_method.name === "level-up"
          )?.level_learned_at || 0;

          const effectEntryEs = moveData.effect_entries.find(e => e.language.name === 'es');
          const effectEntryEn = moveData.effect_entries.find(e => e.language.name === 'en');
          const effect = effectEntryEs?.short_effect || effectEntryEn?.short_effect || "Sin descripción";

          const type = await getTranslatedName(moveData.type.url, "es");
          const damageClass = await getTranslatedName(moveData.damage_class.url, "es");

          return {
            name: translatedName,
            level,
            power: moveData.power,
            accuracy: moveData.accuracy,
            type,
            damage_class: damageClass,
            effect
          };
        })
      );

      const fullData = {
        ...data,
        description,
        translatedAbilities,
        translatedStats,
        translatedTypes,
        translatedMoves,
        evolution_chain_url: evolutionChainUrl
      };

      setPokemon(fullData);
      setLoadingPokemon(false);
      setError(null);
    } catch (err) {
      setPokemon(null);
      setLoadingPokemon(false);
      setError("Pokémon no encontrado");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#222323] border-t-4 border-[#da082b] text-white px-4 sm:px-8 py-10 flex flex-col items-center overflow: hidden; z-10">
      
      
      {pokemon?.sprites?.other?.['official-artwork']?.front_default && (
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={`${pokemon.name} artwork`}
          className="
            fixed
            max-h-[90vh]
            opacity-40
            pointer-events-none
            z-[-1]
            select-none

            /* Posición y escala por defecto (móvil): centrado */
            top-10 left-1/2 transform -translate-x-1/2 scale-120

            /* En pantallas medianas en adelante: anclado a izquierda con más escala */
            md:top-20 md:bottom-0 md:left-20 md:translate-x-0 md:translate-y-0 md:scale-160
          "
        />
      )}

      {/* Botones decorativos */}
      <div className="absolute top-4 left-4 flex space-x-2 z-10">
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#279cea] border-2 border-b-[#1a699d] border-r-[#1a699d] shadow-md"></div>
        <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-red-600 border-2 border-[#222323] shadow-md"></div>
        <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-yellow-400 border-2 border-[#222323] shadow-md"></div>
        <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-green-500 border-2 border-[#222323] shadow-md"></div>
      </div>

      {/* Navegación */}
      <div className="absolute top-4 right-4 flex flex-col sm:flex-row gap-2 z-10">
        <button
          onClick={() => setView("pokedex")}
          className="bg-[#279cea] text-[#082437] font-bold px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded"
        >
          Ver Pokédex
        </button>
        <button
          onClick={() => setView("types")}
          className="bg-[#279cea] text-[#082437] font-bold px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded"
        >
          Tabla de tipos
        </button>
      </div>

      {/* Título */}
      <h1 className="text-4xl lg:text-5xl text-[#da082b] mb-10 mt-15 sm:mt-10 text-center">Pokédex</h1>

      {/* Buscador */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={fetchPokemon}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        pokemonList={pokemonList}
      />

      {/* Vista según modo */}
      {view === "search" && (
        loadingPokemon ? (
          <div className="my-12 flex flex-col items-center space-y-4">
            <div className="relative w-16 h-16 animate-spin-slow">
              <div className="absolute inset-0 border-[6px] border-white border-t-[#da082b] rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#da082b] rounded-full animate-ping"></div>
              </div>
            </div>
            <p className="text-white font-mono text-lg animate-pulse drop-shadow-md">Capturando Pokémon</p>
            <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-[#da082b] animate-loading-bar"></div>
            </div>
          </div>
        ) : (
          <>
            {error && <p className="text-red-400 font-mono text-center">{error}</p>}
            {pokemon && <PokemonCard pokemon={pokemon} onSelectPokemon={fetchPokemon} />}
          </>
        )
      )}

      {view === "pokedex" && (
        <p className="text-white font-mono mt-10 text-center">Aquí irá la Pokédex completa (próximamente sorry) :3</p>
      )}

      {view === "types" && <TypeEffectivenessTable />}
    </div>
  );
}

export default App;
