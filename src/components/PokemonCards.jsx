import CardGeneralInfo from "./CardGeneralInfo";
import CardAbilitiesMoves from "./CardAbilitiesMoves";
import CardTypeEffectiveness from "./CardTypeEffectiveness";
import CardEvolution from "./CardEvolution"

export default function PokemonDetails({ pokemon, onSelectPokemon }) {
  return (
    <div>
      <div className="mx-auto px-4 py-8 grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <CardGeneralInfo pokemon={pokemon} />
        <CardAbilitiesMoves pokemon={pokemon} />
        <CardTypeEffectiveness pokemon={pokemon} />
      </div>
      <div className="mx-auto px-4">
        <CardEvolution url={pokemon.evolution_chain_url} onSelectPokemon={onSelectPokemon} />
      </div>
    </div>
  );
}