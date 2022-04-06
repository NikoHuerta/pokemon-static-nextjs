import type { NextPage } from 'next'
import { Button } from '@nextui-org/react'

import { Layout } from '../components/layouts'

const HomePage: NextPage = () => {
  return (
    <>
      <Layout title='Listado de Pokemon'>
        <Button color="gradient">
          Hello World
        </Button>
      </Layout>


    </>
  )
}

export default HomePage
