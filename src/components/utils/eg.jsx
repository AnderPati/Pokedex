export function getEasterEggPokemon(query) {
  if (query.toLowerCase() !== "cunty regirock") return null;

  return {
    name: "cunty-regirock",
    translatedName: "Cunty Regirock",
    sprites: {
      other: {
        'official-artwork': {
          front_default: "/eg/cunty_regirock.png",
        }
      }
    },
    description: "ÜN ÜN ÜN",
    abilities: [{ ability: { name: "ansiedad" } }],
    stats: [
      { base_stat: 140, stat: { name: "hp" } },
      { base_stat: 80, stat: { name: "attack" } },
      { base_stat: 150, stat: { name: "defense" } },
      { base_stat: 255, stat: { name: "special-attack" } },
      { base_stat: 20, stat: { name: "special-defense" } },
      { base_stat: 120, stat: { name: "speed" } },
    ],
    types: [
      { type: { name: "fairy" } },
      { type: { name: "psychic" } }
    ],
    translatedAbilities: ["Ansiedad"],
    translatedStats: ["PS", "Ataque", "Defensa", "Slayyy", "Def. Esp.", "Velocidad"],
    translatedTypes: ["Hada", "Psíquico"],
    translatedMoves: [
      {
        name: "Y Punch",
        level: 1,
        power: 40,
        accuracy: 100,
        type: "Normal",
        damage_class: "Fisico",
        effect: "Le metes un puño, y ya."
      },
      {
        name: "Y La Queso",
        level: 2,
        power: 0,
        accuracy: 100,
        type: "Psíquico",
        damage_class: "Estado",
        effect: "Aumenta la defensa y la defensa especial del usuario en un nivel."
      },
      {
        name: "PEK",
        level: 5,
        power: 30,
        accuracy: 95,
        type: "Hada",
        damage_class: "Fisico",
        effect: "Le metes el puño PEK y aumenta el ataque y el ataque especial del usuario en un nivel."
      },
      {
        name: "Muy de Hetera",
        level: 7,
        power: 0,
        accuracy: 100,
        type: "Hada",
        damage_class: "Estado",
        effect: "Baja la resistencia especial del enemigo en un nivel."
      },
      {
        name: "Que te Meto con la Teta",
        level: 7,
        power: 0,
        accuracy: 100,
        type: "Hada",
        damage_class: "Estado",
        effect: "Baja la resistencia fisica del enemigo en un nivel."
      },
      {
        name: "Nooo la Polizia",
        level: 10,
        power: 0,
        accuracy: 100,
        type: "Psíquico",
        damage_class: "Estado",
        effect: "Confunde al enemigo y el usuario vuelve a la pokéball permitiendo cambiar de pokémon."
      },
      {
        name: "Periood",
        level: 14,
        power: 60,
        accuracy: 100,
        type: "Psíquico",
        damage_class: "Especial",
        effect: "Generas un desgarro interno al enemigo."
      },
      {
        name: "Vete a la Playa, Guapa",
        level: 95,
        power: 120,
        accuracy: 100,
        type: "Agua",
        damage_class: "Especial",
        effect: "Te manda a la playa."
      },
      {
        name: "Hazte un BackFlip",
        level: 100,
        power: 150,
        accuracy: 80,
        type: "Psíquico",
        damage_class: "Especial",
        effect: "Te hace dar un BackFlip."
      }
    ],
    variants: [],
    evolution_chain_url: null
  };
}
