// src/components/CardGeneralInfo.jsx
import { motion } from "framer-motion";
import StatBar from "./StatBar";
import RadarChart from "./RadarChart";
import { useState } from "react";

const typeColors = {
  normal: "#9ea09e", fire: "#e72324", water: "#2481f0", electric: "#fac100",
  grass: "#3ca024", ice: "#3dd8fe", fighting: "#ff8100", poison: "#923fcc",
  ground: "#92501b", flying: "#82baf0", psychic: "#ef3f7a", bug: "#91a112",
  rock: "#b0ab82", ghost: "#6f3f70", dragon: "#4f60e2", dark: "#4d3e3b",
  steel: "#60a2b9", fairy: "#e96eea"
};


const getTypeColor = (typeName) => {
  return typeColors[typeName.toLowerCase()] || "bg-gray-300";
};


export default function CardGeneralInfo({ pokemon }) {
  const [showOfficialArtwork, setShowOfficialArtwork] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const typeHexColors = pokemon.types.map(t => typeColors[t.type.name.toLowerCase()]);
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${typeHexColors.flatMap(c => [c,c]).join(', ')})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-20 rounded-2xl bg-black/50 border border-white/10 p-6 text-white space-y-6 lg:backdrop-blur-xs"
    >
      <div className="relative">
        <div className="absolute w-[100%] left-1/2 -translate-x-1/2 lg:hidden -bottom-25 z-10">
          <img
            src={pokemon.sprites.other?.['official-artwork']?.front_default}
            alt={`${pokemon.name} artwork`}
            className="m-auto scale-[0.9]"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="relative text-center z-20">
        {/* Capa de sombra (debajo del texto) */}
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                    text-5xl font-extrabold uppercase tracking-wide 
                    opacity-80 text-[#0c0c0c] select-none pointer-events-none text-shadow lg:hidden"
          aria-hidden="true"
        >
          {pokemon.name}
        </span>

        {/* Texto con degradado */}
        <h2
          className="text-5xl font-extrabold uppercase tracking-wide relative"
          style={gradientStyle}
        >
          {pokemon.name}
        </h2>
      </div>

      <div className="flex justify-center gap-4 flex-wrap mt-2">
          {pokemon.sprites.front_default && (
            <img src={pokemon.sprites.front_default} alt="Frente" className="w-30 lg:w-35 pixelated scale-110" loading="lazy"/>
          )}
          {pokemon.sprites.back_default && (
            <img src={pokemon.sprites.back_default} alt="Espalda" className="w-30 lg:w-35 pixelated scale-110" loading="lazy"/>
          )}
          {pokemon.sprites.front_shiny && (
            <img src={pokemon.sprites.front_shiny} alt="Shiny" className="w-30 lg:w-35 pixelated scale-110" loading="lazy"/>
          )}
      </div>

      <p className="text-center text-md text-white/80 leading-relaxed italic max-w-md mx-auto">
        {pokemon.description || "Sin descripción disponible."}
      </p>

      <div>
        <div className="flex gap-2 mt-1 justify-center flex-wrap">
          {pokemon.types.map((t, i) => (
            <span
              key={t.type.name}
              className={`px-2 py-1 text-white rounded-full font-semibold bg-[${getTypeColor(t.type.name)}] text-shadow`}
            >
              {pokemon.translatedTypes?.[i] || t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Estadísticas:</h3>
        <div className="space-y-1">
          {pokemon.stats.map((stat, i) => (
            <StatBar
              key={stat.stat.name}
              name={pokemon.translatedStats?.[i] || stat.stat.name}
              value={stat.base_stat}
            />
          ))}
        </div>

        <div className="mt-6 w-full h-80  flex justify-center items-center">
          <RadarChart stats={pokemon.stats} />
        </div>
      </div>
    </motion.div>
  );
}
