import React from 'react'
import Header from './Header'
import { Toaster } from 'react-hot-toast'

const Layout = ({children, btnName, btnFunction}) => {
  return (
    <div>
        <Header btnName = {btnName} btnFunction={btnFunction}/>
        <main>
        <Toaster/>
           {children}
        </main>
    </div>
  )
}

export default Layout