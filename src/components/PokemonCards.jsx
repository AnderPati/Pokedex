import CardGeneralInfo from "./CardGeneralInfo";
import CardAbilitiesMoves from "./CardAbilitiesMoves";
import CardTypeEffectiveness from "./CardTypeEffectiveness";
import CardEvolution from "./CardEvolution"

export default function PokemonDetails({ pokemon, onSelectPokemon }) {
  return (

<div className="mt-[calc(100vw/3.3)] sm:mt-[calc(100vw/3.3)] md:mt-50 lg:mt-0 mx-auto px-4 pt-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* Columna derecha en lg */}
    <div className="order-1 lg:order-2 flex flex-col lg:space-y-6">
      {/* En mobile, orden 1 */}
      <div className="order-1">
        <CardGeneralInfo pokemon={pokemon} />
      </div>
      {/* En mobile oculto*/}
      <div className="order-2 hidden lg:block">
        <CardTypeEffectiveness pokemon={pokemon}/>
      </div>
    </div>

    {/* Columna izquierda en lg */}
    <div className="order-2 lg:order-1 flex flex-col space-y-6 lg:mt-[505px]">
      {/* 1 en lg | En mobile, esta se muestra en orden 2 */}
      <div className="order-1">
        {pokemon.evolution_chain_url && (
          <CardEvolution url={pokemon.evolution_chain_url} onSelectPokemon={onSelectPokemon} />
        )}
      </div>
      {/* Lg oculto | En mobile, esta se muestra en orden 3 */}
      <div className="order-2 lg:hidden">
        {pokemon.evolution_chain_url && (
          <CardTypeEffectiveness pokemon={pokemon}/>
        )}
      </div>
      {/* siempre se muestra la ultima (teniendo en cuenta que izquierda va despues de derecha) */}
      <div className="order-3">
        <CardAbilitiesMoves pokemon={pokemon} />
      </div>
    </div>

  </div>
</div>



  );
}