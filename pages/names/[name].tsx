import { useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { localFavorites } from '../../utils';
import { Pokemon, PokemonListByName } from '../../interfaces';


interface Props {
    pokemon: Pokemon;
}

export const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorite, setIsInFavorite] = useState( false );

  const onToggleFavorite = async() => {
    localFavorites.toggleFavorite( pokemon.id );
    setIsInFavorite( !isInFavorite );
    
    if( !isInFavorite ) {
      await confetti({
        zIndex: 100,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        }
      });
    }
  }

  return (
   <>
        <Layout title={ pokemon.name }>
          <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
            <Grid xs={ 12 } sm={ 4 }>
              <Card hoverable css={{ padding: '30px' }}>
                <Card.Body>
                  <Card.Image 
                    src={ pokemon.sprites.other?.dream_world.front_default  || '/no-image.png' } 
                    alt={ pokemon.name }
                    width={ '100%' }
                    height={ '200' }
                  />
                </Card.Body>
              </Card>
            </Grid>

            <Grid xs={ 12 } sm={ 8 }>
              <Card>
                <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text h1 transform='capitalize'>{ pokemon.name }</Text>
                  <Button
                    color='gradient'
                    ghost= { isInFavorite }
                    onClick={ onToggleFavorite }
                  >
                    { isInFavorite ? 'En Favoritos' : 'Guardar en Favoritos' } 
                  </Button>
                </Card.Header>

                <Card.Body>
                  <Text size={30}>Sprites:</Text>
                  <Container direction='row' display='flex' justify='space-between'>
                    <Image 
                      src={ pokemon.sprites.front_default }
                      alt={ pokemon.name }
                      width={ 100 } 
                      height={ 100 }
                    />
                    <Image 
                      src={ pokemon.sprites.back_default }
                      alt={ pokemon.name }
                      width={ 100 } 
                      height={ 100 }
                    />
                    <Image 
                      src={ pokemon.sprites.front_shiny }
                      alt={ pokemon.name }
                      width={ 100 } 
                      height={ 100 }
                    />
                    <Image 
                      src={ pokemon.sprites.back_shiny }
                      alt={ pokemon.name }
                      width={ 100 } 
                      height={ 100 }
                    />
                  </Container>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>

        </Layout>
   </>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListByName>(`/pokemon?limit=386`);
  const { results } = data;
  const pokemonNames = results.map( (pokemon: any) => pokemon.name );

  return {
    paths: pokemonNames.map( (name:string) => ({ params: { name } }) ),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ name }`);

  return {
    props: {
      pokemon: data
    }
  }
}

export default PokemonByNamePage;