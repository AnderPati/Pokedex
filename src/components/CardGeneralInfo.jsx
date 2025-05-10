// src/components/CardGeneralInfo.jsx
import { motion } from "framer-motion";
import StatBar from "./StatBar";
import RadarChart from "./RadarChart";
import { useState } from "react";

const typeColors = {
    normal: "bg-[#9ea09e]", fire: "bg-[#e72324]", water: "bg-[#2481f0]", electric: "bg-[#fac100]",
    grass: "bg-[#3ca024]", ice: "bg-[#3dd8fe]", fighting: "bg-[#ff8100]", poison: "bg-[#923fcc]",
    ground: "bg-[#92501b]", flying: "bg-[#82baf0]", psychic: "bg-[#ef3f7a]", bug: "bg-[#91a112]",
    rock: "bg-[#b0ab82]", ghost: "bg-[#6f3f70]", dragon: "bg-[#4f60e2]", dark: "bg-[#4d3e3b]",
    steel: "bg-[#60a2b9]", fairy: "bg-[#e96eea]"
  };

const getTypeColor = (typeName) => {
  return typeColors[typeName.toLowerCase()] || "bg-gray-300";
};

export default function CardGeneralInfo({ pokemon }) {
  const [showOfficialArtwork, setShowOfficialArtwork] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 p-6 text-white space-y-6 z-0"
    >
      <span className={`px-3 py-1 rounded-full text-4xl text-center font-semibold uppercase bg-opacity-80 backdrop-blur-md`}>
        {pokemon.name}
      </span> 

      <div className="flex justify-center gap-4 flex-wrap mt-2">
          {pokemon.sprites.front_default && (
            <img src={pokemon.sprites.front_default} alt="Frente" className="w-20 sm:w-25 md:w-30 lg:w-35 pixelated scale-110" />
          )}
          {pokemon.sprites.back_default && (
            <img src={pokemon.sprites.back_default} alt="Espalda" className="w-20 sm:w-25 md:w-30 lg:w-35 pixelated scale-110" />
          )}
          {pokemon.sprites.front_shiny && (
            <img src={pokemon.sprites.front_shiny} alt="Shiny" className="w-20 sm:w-25 md:w-30 lg:w-35 pixelated scale-110" />
          )}
      </div>

      <p className="text-center text-md text-white/80 leading-relaxed italic max-w-md mx-auto">
        {pokemon.description || "Sin descripción disponible."}
      </p>

      <div>
        <h3 className="font-semibold">Tipos:</h3>
        <div className="flex gap-2 mt-1 justify-center flex-wrap">
          {pokemon.types.map((t, i) => (
            <span
              key={t.type.name}
              className={`px-2 py-1 text-white rounded-full font-semibold ${getTypeColor(t.type.name)} text-shadow`}
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
