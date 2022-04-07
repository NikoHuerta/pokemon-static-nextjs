const toggleFavorite = ( id : number ) => {

    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

    if( favorites.includes(id) ){
        favorites = favorites.filter( item => item !== id ); // elimina el id
    } else {
        favorites.push( id ); // agrega el id
    }
    
    localStorage.setItem( 'favorites', JSON.stringify( favorites) );

}

const getFavorites = (): number[] => {
    
    return JSON.parse( localStorage.getItem('favorites') || '[]' );
}

const existInFavorites = ( id : number ): boolean => {


    // if( typeof window === 'undefined' ) return false;

    const favorites : number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );
    return favorites.includes( id );
}

export default {
    toggleFavorite,
    getFavorites,
    existInFavorites
}