import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function Home() {
  return (<>
    <Header></Header>

    <h1>Welcome to ProductStore</h1>
    <div>Manage and explore products for your needs.</div>
    <Link to='/product'>View Product</Link>
</>
  )
}

export default Home