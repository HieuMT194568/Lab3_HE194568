import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function Error() {
  return (<>
    <Header></Header>

    <h1>404 - Không tìm thấy trang</h1>
    <Link to='/'>Về trang chủ</Link>
</>
  )
}

export default Error
