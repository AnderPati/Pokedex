import CardGeneralInfo from "./CardGeneralInfo";
import CardAbilitiesMoves from "./CardAbilitiesMoves";
import CardTypeEffectiveness from "./CardTypeEffectiveness";
import CardEvolution from "./CardEvolution"

export default function PokemonDetails({ pokemon, onSelectPokemon }) {
  return (
    <div>
      <div className="mt-[calc(100vw/3.3)] sm:mt-[calc(100vw/3.3)] md:mt-50 lg:mt-0 mx-auto px-4 pt-8 pb-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Columna vacía para dejar espacio visual a la imagen */}
        <div className="hidden lg:flex flex-col justify-end h-full">
          <CardEvolution url={pokemon.evolution_chain_url} onSelectPokemon={onSelectPokemon} />
        </div>

        <div>
          <CardGeneralInfo pokemon={pokemon} />
        </div>
        <div className="lg:hidden">
          <CardEvolution url={pokemon.evolution_chain_url} onSelectPokemon={onSelectPokemon} />
        </div>
      </div>
      <div className="mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-3 ">
          <CardTypeEffectiveness pokemon={pokemon}/>
          <CardAbilitiesMoves pokemon={pokemon} />
      </div>
    </div>
  );
}