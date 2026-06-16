// src/components/CardTypeEffectiveness.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  effectivenessLabelOrder,
  effectivenessLabels,
  getTypeColor,
  typeList,
  typeTranslations,
} from "../constants/pokemonTypes";

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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl bg-black/50 border border-white/10 p-6 text-white space-y-6"
    >
      <h3 className="text-xl font-bold pb-2">Dano recibido</h3>

      <div className="overflow-x-auto text-sm">
        <table className="w-full table-auto border-collapse">
          <tbody>
            {effectivenessLabelOrder.map((multiplier) => {
              const label = effectivenessLabels[multiplier];
              const types = effectiveness[multiplier] || [];

              return (
                <tr key={multiplier} className="border-t">
                  <td className="p-2 font-semibold text-sm align-top">
                    x{multiplier} {label}:
                    <br />
                    <div className="flex flex-wrap gap-2 py-2 mt-2">
                      {types.length > 0 ? (
                        types.map((type) => (
                          <span
                            key={type}
                            className={`text-white px-2 py-1 text-xs font-semibold uppercase rounded-full ${getTypeColor(type)} text-shadow`}
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
