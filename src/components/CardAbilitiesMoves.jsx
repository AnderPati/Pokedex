// src/components/CardAbilitiesMoves.jsx
import {  useState, useEffect, useRef  } from "react";
import { motion } from "framer-motion";

export default function CardAbilitiesMoves({ pokemon }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const tooltipRefs = useRef([]);
  
  const toggleTooltip = (index) => {
    setActiveTooltip((prev) => (prev === index ? null : index));
  };

  // Cerrar el tooltip al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRefs.current[activeTooltip] &&
        !tooltipRefs.current[activeTooltip].contains(event.target)
      ) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeTooltip]);

  const typeColors = {
    normal: "bg-[#9ea09e]", fuego: "bg-[#e72324]", agua: "bg-[#2481f0]", eléctrico: "bg-[#fac100]", planta: "bg-[#3ca024]", hielo: "bg-[#3dd8fe]", lucha: "bg-[#ff8100]", veneno: "bg-[#923fcc]", tierra: "bg-[#92501b]", volador: "bg-[#82baf0]", psíquico: "bg-[#ef3f7a]", bicho: "bg-[#91a112]", roca: "bg-[#b0ab82]", fantasma: "bg-[#6f3f70]", dragón: "bg-[#4f60e2]", siniestro: "bg-[#4d3e3b]", acero: "bg-[#60a2b9]", hada: "bg-[#e96eea]"
  };

  const getTypeColor = (typeName) => {
    return typeColors[typeName.toLowerCase()] || "bg-gray-300";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-6 text-white space-y-6"
    >
      <h3 className="text-lg font-bold pb-2">Habilidades</h3>
      <ul className="list-disc list-inside text-sm space-y-1">
        {pokemon.translatedAbilities?.map((ability, i) => (
          <li key={i}>{ability}</li>
        ))}
      </ul>

      <h3 className="text-lg font-bold border-t py-2 mt-4">Movimientos por nivel</h3>
      <ul className="text-sm space-y-2 pr-2">
        {pokemon.translatedMoves
          .sort((a, b) => a.level - b.level)
          .map((move, i) => (
            <li key={i} className="relative">
              <button
                onClick={() => toggleTooltip(i)}
                className="text-left w-full font-semibold cursor-pointer focus:outline-none hover:underline"
              >
                Lvl {move.level}: {move.name}
              </button>

              {/* Tooltip visible si coincide el índice */}
              {activeTooltip === i && (
                <div className="absolute z-10 top-full left-0 mt-2 w-64 bg-stone-300 text-black p-2 rounded shadow-lg border border-gray-300" ref={(el) => (tooltipRefs.current[i] = el)}
>
                  <p className="text-sm font-bold">{move.name}</p>
                  <p className="text-xs text-gray-700 italic mb-1">{move.effect || "Sin efecto"}</p>
                  <div className="text-xs space-y-1">
                    <p>
                      <strong>Tipo:</strong> <span className={`text-white px-2 py-1 text-xs font-semibold uppercase ${getTypeColor(move.type)} text-shadow`}>{move.type}</span>
                    </p>
                    <p>
                      <strong>Clase:</strong> {move.damage_class}
                    </p>
                    <p>
                      <strong>Poder:</strong> {move.power ?? "—"}
                    </p>
                    <p>
                      <strong>Precisión:</strong> {move.accuracy ?? "—"}
                    </p>
                  </div>
                </div>
              )}
            </li>
          ))}
      </ul>
    </motion.div>
  );
}
