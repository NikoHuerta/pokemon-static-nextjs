import { FC } from "react";
import Head from "next/head";

import { NavBar } from '../ui';

interface Props {
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {


    

    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Nicolas Huerta" />
                <meta name="descripcion" content={`Informacion sobre el pokémon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />

                <meta property="og:title" content={`Información Sobre ${ title }`} />
                <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
                <meta property="og:image" content={`${ origin }/img/banner.png`} />
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