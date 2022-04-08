import { useEffect, useState } from 'react';

import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavoritePokemon } from '../../components/pokemon';


const FavoritesPage = () => {

  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritePokemons( localFavorites.getFavorites() );
  }, []);

  
  return (
      <Layout  title='Favoritos'>
        { 
          (favoritePokemons.length === 0)
          ?   ( <NoFavorites /> )
          :   ( <FavoritePokemon favoritePokemons={ favoritePokemons } /> )
        }
      </Layout>        
  )
};

export default FavoritesPage;
