import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function EvolutionChain({ url, onSelectPokemon }) {
  const [chainData, setChainData] = useState({});
  const [loading, setLoading] = useState(true);

  const getTranslatedName = async (url, lang = "es") => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.names && Array.isArray(data.names)) {
        const translated = data.names.find((n) => n.language.name === lang);
        return translated?.name ?? data.name;
      }

      return data.name;
    } catch (error) {
      console.error("Error al traducir nombre desde", url, error);
      return "";
    }
  };

  const parseChain = async (node) => {
    const list = [];

    const traverse = async (stage, depth = 0) => {
      const evolutionDetails = stage.evolution_details?.[0] || {};
      let evolutionMethod = null;

      const methodParts = [];

      if (evolutionDetails.min_level != null) {
        methodParts.push(`Nivel ${evolutionDetails.min_level}`);
      }

      if (evolutionDetails.item || evolutionDetails.held_item) {
        const itemUrl =
          evolutionDetails.item?.url || evolutionDetails.held_item?.url;
        const itemName = await getTranslatedName(itemUrl);
        methodParts.push(`Usando ${itemName}`);
      }

      if (evolutionDetails.trigger?.name === "trade") {
        methodParts.push("Intercambio");
      }

      if (evolutionDetails.min_happiness != null) {
        methodParts.push("Felicidad");
      }

      if (evolutionDetails.known_move) {
        const moveName = await getTranslatedName(
          evolutionDetails.known_move.url
        );
        methodParts.push(`con movimiento ${moveName}`);
      }

      if (evolutionDetails.known_move_type) {
        const moveType = await getTranslatedName(
          evolutionDetails.known_move_type.url
        );
        methodParts.push(`movimiento de tipo ${moveType}`);
      }

      if (evolutionDetails.time_of_day) {
        const time =
          evolutionDetails.time_of_day === "night"
            ? "de noche"
            : evolutionDetails.time_of_day === "day"
            ? "de día"
            : evolutionDetails.time_of_day;
        methodParts.push(`${time}`);
      }

      if (evolutionDetails.location) {
        const locationName = await getTranslatedName(
          evolutionDetails.location.url
        );
        methodParts.push(`en ${locationName}`);
      }

      if (evolutionDetails.needs_overworld_rain) {
        methodParts.push("mientras llueve");
      }

      if (evolutionDetails.gender != null) {
        methodParts.push(
          `(${evolutionDetails.gender === 1 ? "hembra" : "macho"})`
        );
      }

      if (methodParts.length) {
        evolutionMethod = methodParts.join(" ");
      }

      list.push({
        name: stage.species.name,
        level: depth,
        evolutionMethod,
      });

      if (stage.evolves_to?.length > 0) {
        for (const child of stage.evolves_to) {
          await traverse(child, depth + 1);
        }
      }
    };

    await traverse(node);
    return list;
  };

  useEffect(() => {
    const fetchChain = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        const evoNames = await parseChain(data.chain);

        const details = await Promise.all(
          evoNames.map(async (entry) => {
            const pokeRes = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${entry.name}`
            );
            const pokeData = await pokeRes.json();
            return {
              name: pokeData.name,
              sprite: pokeData.sprites.front_default,
              level: entry.level,
              evolutionMethod: entry.evolutionMethod,
            };
          })
        );

        const grouped = {};
        details.forEach((poke) => {
          if (!grouped[poke.level]) grouped[poke.level] = [];
          grouped[poke.level].push(poke);
        });

        setChainData(grouped);
      } catch (error) {
        console.error("Error loading evolution chain", error);
        setChainData({});
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchChain();
  }, [url]);

  if (loading)
    return (
      <div className="flex flex-col items-center mt-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-6">
        <p className="text-white font-mono text-lg animate-pulse text-shadow">
          Evolucionando
        </p>
        <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-[#da082b] animate-loading-bar"></div>
        </div>
      </div>
    );

  if (Object.keys(chainData).length <= 1) {
    return (
      <div className="rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-6 text-white">
        <p className="text-sm text-center text-gray-300">
          Este pokémon no evoluciona.
        </p>
      </div>
    );
  }

  const isLinear = Object.values(chainData).every(
    (group) => group.length === 1
  );

  const randomOffset = () => Math.floor(Math.random() * 61) - 30;

  return (
    <div className="w-full rounded-2xl bg-black/50 backdrop-blur-[2px] border border-white/10 pb-5 text-white">
      <h3 className="text-xl font-bold pl-5 pt-4">Cadena evolutiva</h3>
      {isLinear ? (
        <div className="flex items-center justify-center sm:gap-4 flex-wrap flex-col sm:flex-row">
          {Object.values(chainData).map((group, index, arr) => {
            const p = group[0];
            return (
              <div key={p.name} className="flex items-center sm:gap-2">
                
                <div className="text-center">
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: randomOffset(), y: randomOffset(), scale: 1.05 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <img
                      src={p.sprite}
                      alt={p.name}
                      onClick={() => onSelectPokemon(p.name)}
                      className="w-25 h-25 mx-auto cursor-pointer hover:scale-110 transition-transform duration-200"
                      loading="lazy"
                    />
                    <p
                      onClick={() => onSelectPokemon(p.name)}
                      className="capitalize text-sm mt-1 cursor-pointer hover:underline"
                    >
                      {p.name}
                    </p>
                    {index > 0 && p.evolutionMethod && (
                      <p className="text-xs text-gray-300 italic mt-0.5">
                        {p.evolutionMethod}
                      </p>
                    )}
                  </motion.div>
                  {index < arr.length - 1 && (
                    <span className="text-xl mt-3 sm:hidden flex justify-center w-full">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="30px"
                        width="30px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                      </svg>
                    </span>
                  )}
                </div>
                {index < arr.length - 1 && (
                  <span className="text-xl hidden sm:block">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="30px"
                      width="30px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        Object.entries(chainData).map(([level, pokes], index, arr) => (
          <div key={level} className="flex flex-col items-center">
            <div className="flex flex-wrap gap-3 justify-center">
              {pokes.map((p, idx) => (
                <div key={p.name} className="text-center">
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: randomOffset(), y: randomOffset(), scale: 1.05 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <img
                      src={p.sprite}
                      alt={p.name}
                      onClick={() => onSelectPokemon(p.name)}
                      className="w-25 h-25 mx-auto cursor-pointer hover:scale-110 transition-transform duration-200"
                      loading="lazy"
                    />
                    <p
                      onClick={() => onSelectPokemon(p.name)}
                      className="capitalize text-sm cursor-pointer hover:underline"
                    >
                      {p.name}
                    </p>
                    {p.evolutionMethod && (
                      <p className="text-xs text-gray-300 italic mt-0.5">
                        {p.evolutionMethod}
                      </p>
                    )}
                  </motion.div>
                  {index < arr.length - 1 && (
                    <div className="text-xl flex justify-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="30px"
                        width="30px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
