import { useRouter } from 'next/router'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { Layout } from '../../components/layouts'
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';


interface Props {
  // pokemon: any;
  pokemon: Pokemon;

}

const PokemonPage: NextPage<Props>= ( { pokemon } ) => {

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
              <Button
                color='gradient'
                ghost
              >
                Guardar en Favoritos
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
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemon386 = [...Array(386)].map( (value, index) => `${ index + 1 }` );
  // console.log({pokemon386});

  return {
    // paths: [ //array of paths
    //   {
    //     params: { id: '1', name: 'Bulbasaur' }
    //   },
    //   {
    //     params: { id: '2', name: 'Ivysaur' }
    //   },
    //   {
    //     params: { id: '3', name: 'Venusaur' }
    //   }    
    // ],
    paths: pokemon386.map(id => ({ params: { id } })),
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => { //Se ejecuta del lado del servidor unicamente ctx=contexto

  // console.log(ctx.params); //property en buildtime, no en runtime, desde el cliente no se puede acceder a esta propiedad
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data
    }
  }
}
  

export default PokemonPage;
