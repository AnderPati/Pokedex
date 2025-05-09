// src/components/CardTypeEffectiveness.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const typeList = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting",
  "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
  "dragon", "dark", "steel", "fairy"
];

export const typeTranslations = {
  normal: "Normal", fire: "Fuego", water: "Agua", electric: "Eléctrico", grass: "Planta", ice: "Hielo",
  fighting: "Lucha", poison: "Veneno", ground: "Tierra", flying: "Volador", psychic: "Psíquico",
  bug: "Bicho", rock: "Roca", ghost: "Fantasma", dragon: "Dragón", dark: "Siniestro",
  steel: "Acero", fairy: "Hada"
};

const effectivenessLabels = {
  4: "Súper débil a",
  2: "Débil a",
  1: "Daño normal",
  0.5: "Resistente a",
  0.25: "Superresistente a",
  0: "Inmune a"
};

const labelOrder = [4, 2, 1, 0.5, 0.25, 0]; // Para mostrar en el orden de la tabla

const typeColors = {
  normal: "bg-[#9ea09e]", fire: "bg-[#e72324]", water: "bg-[#2481f0]", electric: "bg-[#fac100]",
  grass: "bg-[#3ca024]", ice: "bg-[#3dd8fe]", fighting: "bg-[#ff8100]", poison: "bg-[#923fcc]",
  ground: "bg-[#92501b]", flying: "bg-[#82baf0]", psychic: "bg-[#ef3f7a]", bug: "bg-[#91a112]",
  rock: "bg-[#b0ab82]", ghost: "bg-[#6f3f70]", dragon: "bg-[#4f60e2]", dark: "bg-[#4d3e3b]",
  steel: "bg-[#60a2b9]", fairy: "bg-[#e96eea]"
};

const getTypeColor = (type) => typeColors[type] || "bg-gray-300";

export default function CardTypeEffectiveness({ pokemon }) {
  const [effectiveness, setEffectiveness] = useState({});

  useEffect(() => {
    const calculateEffectiveness = async () => {
      const multipliers = {};
      typeList.forEach((type) => (multipliers[type] = 1));

      for (const { type } of pokemon.types) {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type.name}`);
        const data = await res.json();
        const dmg = data.damage_relations;

        dmg.no_damage_from.forEach((t) => (multipliers[t.name] *= 0));
        dmg.half_damage_from.forEach((t) => (multipliers[t.name] *= 0.5));
        dmg.double_damage_from.forEach((t) => (multipliers[t.name] *= 2));
      }

      // Agrupar por valor de multiplicador
      const grouped = {};
      Object.entries(multipliers).forEach(([type, value]) => {
        if (!grouped[value]) grouped[value] = [];
        grouped[value].push(type);
      });

      setEffectiveness(grouped);
    };

    calculateEffectiveness();
  }, [pokemon]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white text-gray-900 p-6 shadow-xl space-y-4"
    >
      <h3 className="text-xl font-bold pb-2">Daño recibido</h3>

      <div className="overflow-x-auto text-sm">
        <table className="w-full table-auto border-collapse">
          <tbody>
            {labelOrder.map((multiplier) => {
              const label = effectivenessLabels[multiplier];
              const types = effectiveness[multiplier] || [];

              return (
                <tr key={multiplier} className="border-t">
                  <td className="p-2 font-semibold text-sm align-top">
                    {multiplier === 0 && "🛡️ x0"}{multiplier === 0.25 && "🟢 x0.25"}
                    {multiplier === 0.5 && "🔵 x0.5"}{multiplier === 1 && "➖"}
                    {multiplier === 2 && "🟠 x2"}{multiplier === 4 && "🔴 x4"} {label}:
                    <br/>
                    <div className="flex flex-wrap gap-2 py-2 mt-2">
                    {types.length > 0 ? (
                        types.map((type) => (
                          <span
                            key={type}
                            className={`text-white px-2 py-1 text-xs font-semibold uppercase ${getTypeColor(type)} text-shadow `}
                          >
                            {typeTranslations[type] || type}
                          </span>
                        ))
                    ) : (
                        <em className="text-gray-400">Ninguno</em>
                    )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
