import { useEffect, useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { Button, Card, Col, Container, Grid, Row, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts'
import { pokeApi } from '../../api';
import { Pokemon, PokemonColorTypes } from '../../interfaces';
import { localFavorites, pokemonTypesColor } from '../../utils';



interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props>= ( { pokemon } ) => {

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

  let color = '';
  // console.log({ existeWindow: typeof window }); //para ver si existen renderizados en el navegador o en el servidor...
  // util cuando se usa NextJS en el servidor y no se sabe por que falla el renderizado

  useEffect(() => {
    localFavorites.existInFavorites( pokemon.id ) ? setIsInFavorite(true) : setIsInFavorite(false);
  }, []);


  return (
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
                  { 
                    pokemon.types.map( (value, index) => (
                      <Button 
                        rounded 
                        size='sm' 
                        css={{ background: pokemonTypesColor.colorTypes[value.type.name as keyof PokemonColorTypes] }}
                        key={ index }>
                        <Text transform='capitalize'>{ value.type.name }</Text>
                      </Button>
                    )) 
                  }

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
            <Card.Footer>
              <Container gap={ 0 }>
                <Row gap={ 1 }>
                  <Col>
                    <Text size={20}>Base Stats:</Text>
                    { 
                      pokemon.stats.map( (value, index) => (
                        <Text transform='capitalize' size={15} key={ index } >{ value.stat.name } : { value.base_stat }</Text>
                      ))
                    }
                  </Col>
                  <Col>
                    <Text size={20}>Abilities:</Text>
                    { 
                      pokemon.abilities.map( (value, index) => (
                        <Text transform='capitalize' size={15} key={ index } >{ value.ability.name }  { value.is_hidden && '( Hidden )' }</Text>
                      ))
                    }
                  </Col>
                </Row>
              </Container>
            </Card.Footer>
          </Card>
        </Grid>

      </Grid.Container>



    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemon386 = [...Array(386)].map( (value, index) => `${ index + 1 }` );

  return {
    paths: pokemon386.map(id => ({ params: { id } })),
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => { //Se ejecuta del lado del servidor unicamente ctx=contexto

  // console.log(ctx.params); //property en buildtime, no en runtime, desde el cliente no se puede acceder a esta propiedad
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  
  const pokemon = {
    id: data.id,
    name: data.name,  
    sprites: data.sprites,
    types: data.types,
    abilities: data.abilities,
    stats: data.stats
  }

  return {
    props: {
      pokemon
    }
  }
}
  

export default PokemonPage;
