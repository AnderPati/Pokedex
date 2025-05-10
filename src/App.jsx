import { useState, useEffect } from "react";
import './app.css';
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCards";
import TypeEffectivenessTable from "./components/TypeEffectivenessTable";
import Hero from "./components/Hero";
import { motion } from "framer-motion";

// Hook para obtener el ancho de la ventana
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

function App() {
  const [view, setView] = useState("search");
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const width = useWindowWidth();

  const baseSize = pokemon 
  ? (width < 640 ? 3.5 : width < 768 ? 3.5 : 3.5)
  : (width < 640 ? 4.5 : width < 768 ? 5.5 : 6);
  const dynamicFontSize = `${baseSize - scrollProgress * 2.45}rem`;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = 100;
          setScrollProgress(Math.min(scrollY / maxScroll, 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            v => v.move_learn_method.name === "level-up"
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

      setPokemon({
        ...data,
        description,
        translatedAbilities,
        translatedStats,
        translatedTypes,
        translatedMoves,
        evolution_chain_url: evolutionChainUrl
      });
      setLoadingPokemon(false);
      setError(null);
    } catch (err) {
      setPokemon(null);
      setLoadingPokemon(false);
      setError("Pokémon no encontrado");
    }
  };

  const randomOffset = () => Math.floor(Math.random() * 61) - 30;
  const isMobile = width < 768;
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] text-white z-10 min-w-[375px]">

      {/* Header dinámico */}
      <div
        className="sticky sticky-header top-0 z-20 transition-all duration-300 ease-in-out w-full"
        style={{
          backgroundColor: `rgba(15, 15, 15, ${isMobile ? scrollProgress * 0.95 : scrollProgress * 0.8})`,
          backdropFilter: isMobile ? 'none' : `blur(${scrollProgress * 10}px)`,
          WebkitBackdropFilter: isMobile ? 'none' : `blur(${scrollProgress * 10}px)`,
          paddingTop: `${1.5 - scrollProgress * 0.5}rem`,
          paddingBottom: `${1.5 - scrollProgress * 0.5}rem`,
          boxShadow: scrollProgress > 0.05 ? `0 4px 12px rgba(0,0,0,0.4)` : "none"
        }}
      >
        <div className="flex justify-center">
          <h1
            onClick={() => (setPokemon(null), setView("search"))}
            className="text-center font-black text-[#da082b] transition-all duration-300 mb-1 mt-10 md:mt-0 cursor-pointer"
            style={{ fontSize: dynamicFontSize }}
          >
            POKÉDEX
          </h1>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={fetchPokemon}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          pokemonList={pokemonList}
        />

        {/* Navegación */}
        <div className="absolute top-4 right-4 flex flex-row lg:flex-col gap-2 z-10">
          <button
            onClick={() => setView("pokedex")}
            className="bg-[#279cea] text-[#082437] font-bold px-3 py-1 md:px-4 md:py-2 text-sm lg:text-base rounded-full"
          >
            Pókedex entera
          </button>
          <button
            onClick={() => setView("types")}
            className="bg-[#279cea] text-[#082437] font-bold px-3 py-1 md:px-4 md:py-2 text-sm lg:text-base rounded-full"
          >
            Tabla de tipos
          </button>
        </div>

        {/* Botones decorativos */}
        <div className="absolute top-4 left-4 flex space-x-2 z-10">
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#1a699d] border-2 border-t-[#b2b2b2] border-l-[#b2b2b2] border-b-[#0d3550] border-r-[#0d3550] shadow-md"></div>
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-red-400 border-2 border-[#222323] shadow-md"></div>
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-yellow-200 border-2 border-[#222323] shadow-md"></div>
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-green-300 border-2 border-[#222323] shadow-md"></div>
        </div>
      </div>

      <div className="p-3 max-w-[1536px] mx-auto relative z-0">

          {/* Imagen del Pokémon */}
          {view === "search" && pokemon?.sprites?.other?.['official-artwork']?.front_default && (
            <motion.div
              key={pokemon.name}
              initial={{ opacity: 0, x: randomOffset(), y: randomOffset(), scale: 1.05 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="hidden lg:block absolute left-1/2 top-10 lg:top-30 -translate-x-1/2 scale-[1.2] lg:scale-[1.4] lg:left-1/4 z-45"
            >
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                className="max-h-[90vh] object-contain"
                alt={`${pokemon.name} artwork`}
                loading="lazy"
              />
            </motion.div>
          )}

        {/* Contenido principal */}
        <div className="relative py-10 flex flex-col items-center">
          {view === "search" && (
            <>
              {loadingPokemon && (
                <div className="absolute flex flex-col items-center space-y-4 rounded-[20px] z-50 backdrop-blur-2xl w-[100%] py-10">
                  <div className="relative w-16 h-16 animate-spin-slow border-2 border-black rounded-full">
                    <div className="absolute inset-0 border-[6px] border-white bg-white rounded-full"></div>
                    <div className="absolute inset-0  flex items-start">
                      <div className="w-16 h-1/2 bg-[#da082b] rounded-t-[999px] border-b-3 border-black"></div>
                    </div>
                    <div className="absolute inset-0  flex items-center justify-center">
                      <div className="w-5 h-5 mb-[2px] bg-white border-3 border-black rounded-full"></div>
                    </div>
                    <div className="absolute inset-0  flex items-center justify-center">
                      <div className="w-2 h-2 mb-[2px] bg-[#da082b] rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <p className="text-white font-mono text-lg animate-pulse text-shadow">Capturando Pokémon</p>
                  <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#da082b] animate-loading-bar"></div>
                  </div>
                </div>
              )}
              {error && <p className="text-red-400 font-mono text-center">{error}</p>}
              {pokemon && <PokemonCard pokemon={pokemon} onSelectPokemon={fetchPokemon}/>}
              {!pokemon  && !error && <Hero />}
            </>
          )}

          {view === "pokedex" && (
            <p className="text-white font-mono mt-10 text-center">Aquí irá la Pokédex completa (próximamente sorry) :3</p>
          )}

          {view === "types" && <TypeEffectivenessTable />}
        </div>

      </div>
    </div>
  );
}

export default App;
