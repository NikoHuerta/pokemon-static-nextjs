import { FC } from "react";

import Head from "next/head";
import { NavBar } from '../ui';

interface Props {
    title?: string;
}


export const Layout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Nicolas Huerta" />
                <meta name="descripcion" content={`Informacion sobre el pokémon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
            </Head>

            <NavBar />

            <main style={{
                padding: '0px 20px' // 20px padding left and right
            }}>
                {children}
            </main>
        </>
    )
}