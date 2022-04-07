import { FC } from "react";
import { Grid } from "@nextui-org/react"

import { FavoriteCardPokemon } from ".";

interface Props {
    favoritePokemons: number[];
}

export const FavoritePokemon: FC<Props> = ({ favoritePokemons }) => {
  return (
    <>
        <Grid.Container gap={ 2 } direction='row' justify='flex-start' >
            {
                favoritePokemons.map( (id:number) => (
                    <FavoriteCardPokemon key={ id } id={ id }  />
                ))  
            }    
        </Grid.Container>  
    </>
  )
}
