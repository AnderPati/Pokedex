import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const typeList = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting",
  "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
  "dragon", "dark", "steel", "fairy"
];

const typeTranslations = {
  normal: "Normal", fire: "Fuego", water: "Agua", electric: "Eléctrico",
  grass: "Planta", ice: "Hielo", fighting: "Lucha", poison: "Veneno",
  ground: "Tierra", flying: "Volador", psychic: "Psíquico", bug: "Bicho",
  rock: "Roca", ghost: "Fantasma", dragon: "Dragón", dark: "Siniestro",
  steel: "Acero", fairy: "Hada"
};

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

export default function TypeEffectivenessTable() {
  const [matrix, setMatrix] = useState({});
  const [loadingPokemon, setLoadingPokemon] = useState(true);
  const [hoveredCell, setHoveredCell] = useState({ row: null, col: null });

  useEffect(() => {
    const fetchTypes = async () => {
      const data = {};
      for (const atk of typeList) {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${atk}`);
        const json = await res.json();
        data[atk] = {};
        for (const def of typeList) data[atk][def] = 1;
        json.damage_relations.double_damage_to.forEach(t => data[atk][t.name] *= 2);
        json.damage_relations.half_damage_to.forEach(t => data[atk][t.name] *= 0.5);
        json.damage_relations.no_damage_to.forEach(t => data[atk][t.name] *= 0);
      }
      setMatrix(data);
      setLoadingPokemon(false);
    };
    fetchTypes();
  }, []);

  if (loadingPokemon) {
    return (
      <div className="my-12 flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16 animate-spin-slow">
          <div className="absolute inset-0 border-[6px] border-white border-t-[#da082b] rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#da082b] rounded-full animate-ping"></div>
          </div>
        </div>
        <p className="text-white font-mono text-lg animate-pulse drop-shadow-md">Estudiando Tipos</p>
        <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-[#da082b] animate-loading-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="align w-full max-w-full overflow-x-auto"
    >
      <table className="min-w-[1000px] table-auto border-collapse border border-white text-xd animate-fade-in mx-auto bg-black/70 backdrop-blur-md">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 border border-white p-2 bg-black text-white">ATK\DF</th>
            {typeList.map((type, colIdx) => (
              <th
                key={type}
                className={`border px-1 py-0.5 text-center text-[14px] whitespace-nowrap h-8 text-white ${getTypeColor(type)} text-shadow`}
              >
                {typeTranslations[type]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {typeList.map((attacker, rowIdx) => (
            <tr key={attacker}>
              <th
                className={`sticky left-0 z-10 border px-1 py-0.5 text-center text-[14px] whitespace-nowrap h-8 text-white ${getTypeColor(attacker)} text-shadow`}
              >
                {typeTranslations[attacker]}
              </th>
              {typeList.map((defender, colIdx) => {
                const value = matrix[attacker]?.[defender];
                const bgClass =
                  value === 0
                    ? "bg-gray-500"
                    : value === 0.5
                    ? "bg-blue-500"
                    : value === 2
                    ? "bg-red-600"
                    : value === 4
                    ? "bg-red-800"
                    : value === 0.25
                    ? "bg-blue-800"
                    : "";

                const highlightBorder =
                  hoveredCell.row === rowIdx || hoveredCell.col === colIdx
                    ? "bg-[#51ae5e]/30"
                    : "";

                return (
                  <td
                    key={defender}
                    className={`border px-2 py-1 text-center text-[14px] font-semibold ${bgClass} ${highlightBorder}`}
                    onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                    onMouseLeave={() => setHoveredCell({ row: null, col: null })}
                  >
                    {value === 1 ? "" : value + "×"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
