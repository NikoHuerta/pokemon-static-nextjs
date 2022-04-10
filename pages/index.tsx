import { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';

import { pokeApi } from '../api';
import { Layout } from '../components/layouts'
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';


interface Props {
  pokemons: SmallPokemon[];
}



const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <>
      <Layout title='Listado de Pokemon'>
        <Grid.Container gap={ 2 } justify='flex-start'>
          { 
            pokemons.map( poke => (
              <PokemonCard key={ poke.id } pokemon={ poke } />
            ))
          }
        </Grid.Container>

      </Layout>


    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => { //Se ejecuta del lado del servidor unicamente

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=386');

  const pokemons: SmallPokemon[] = data.results.map( (pokemon: any, index: number) => ({
      
      ...pokemon,
      id: index+1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;
