import Head from 'next/head'
import React from 'react'
import About from '../component/About'

function AboutUs() {
  return (
    <div>

<Head>
        <title>Kinox | About Us</title>
        <meta
          name="Kinox Apparel"
          content="Kinox Apparel | About US"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <About/>
    </div>
  )
}

export default AboutUs