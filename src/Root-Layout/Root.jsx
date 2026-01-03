import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer/Footer'

const Root = () => {
  return (
    <div>
        <NavBar></NavBar>
        <div className='pt-16'>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Root